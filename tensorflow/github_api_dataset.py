from concurrent.futures import ThreadPoolExecutor, as_completed
import os
import pandas as pd
import requests
import datetime


# Your GitHub Personal Access Token
TOKEN = "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"


""" RATE LIMITS """

# Primary Rate Limiting Factors
# 5000 requests per hour for authenticated requests
# 60 requests per hour for unauthenticated requests

# Secondary Rate Limiting Factors
# 90 seconds of CPU time per 60 seconds of real time
# No more than 100 concurrent request

GITHUB_API = "https://api.github.com"
HEADERS = {"Authorization": f"token {TOKEN}"}

# getting the rate limit status
before_response = requests.get(f"{GITHUB_API}/rate_limit", headers=HEADERS)

input(
    f"\033[1m\033[31mWARNING: {before_response.headers['X-Ratelimit-Remaining']} requests remaining. Press Enter to continue...\033[0m\n")


def fetch_user_details(username):
    """ Fetch detailed information of a user. """
    response = requests.get(f"{GITHUB_API}/users/{username}", headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        return None


MIN_FOLLOWERS = 25
MAX_FOLLOWERS = 1000
NUM_USERS = 100


def search_users(min_followers=MIN_FOLLOWERS, max_followers=MAX_FOLLOWERS):
    """ Search for users with followers in a specified range and located in the USA. """
    query = f"followers:{min_followers}..{max_followers}+location:USA"
    response = requests.get(
        f"{GITHUB_API}/search/users?q={query}&per_page={NUM_USERS}", headers=HEADERS)
    if response.status_code == 200:
        return response.json()['items']
    else:
        print(f"Error fetching users: {response.json()}")
        return []


def get_user_repos(username):
    """ Get repositories of a user. """
    response = requests.get(
        f"{GITHUB_API}/users/{username}/repos", headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching repos: {response.json()}")
        return []


def analyze_repos(repos):
    """ Analyze repositories to extract languages and tech keywords. """
    languages = {}
    tech_keywords = []
    project_descriptions = []

    for repo in repos:
        if 'languages_url' in repo:  # Check if languages_url exists in the repo
            response = requests.get(repo['languages_url'], headers=HEADERS)
            if response.status_code == 200:
                repo_languages = response.json()
                for lang in repo_languages:
                    languages[lang] = languages.get(lang, 0) + 1
            else:
                print(f"Failed to fetch languages for repo: {response.json()}")
        else:
            print(f"No 'languages_url' found for repo: {repo}")

        # Example: Extract tech keywords from repo's name or description
        # In reality, this might require more sophisticated analysis
        tech_keywords.extend(repo['name'].split('-'))

        if repo['description']:
            project_descriptions.append(repo['description'])

    # Sort and pick top 5 languages and top 10 tech keywords
    top_languages = sorted(languages, key=languages.get, reverse=True)[:5]
    top_tech_keywords = list(set(tech_keywords))[:10]

    return top_languages, top_tech_keywords, project_descriptions


def fetch_user_data(user):
    """ Fetch detailed user data including repos and return processed data. """
    print(f"Fetching data for user: {user['login']}")
    user_details = fetch_user_details(user['login'])
    if user_details:
        repos = get_user_repos(user['login'])
        if repos:
            experience_level = "Beginner" if len(
                repos) < 25 else "Intermediate" if len(repos) < 50 else "Expert"
            languages, tech_keywords, projects = analyze_repos(repos)
            print(f"Data fetched for user: {user['login']}")
            return {
                "role": user_details.get('bio', 'No bio'),
                "experience_level": experience_level,
                "languages": languages,
                "tech_keywords": tech_keywords,
                "projects": projects
            }
    return None


def create_dataset():
    users = search_users()
    print(f"Found {len(users)} users")
    data = []
    processed_count = 0

    THREADS = 10

    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        future_to_user = {executor.submit(
            fetch_user_data, user): user for user in users}
        for future in as_completed(future_to_user):
            user_data = future.result()
            if user_data:
                data.append(user_data)
                processed_count += 1
                if processed_count % THREADS == 0:
                    print(f"Processed {processed_count}/{len(users)} users")

    dataset = pd.DataFrame(data)

    # Save to CSV
    csv_filename = "github_users_dataset.csv"

    # Check if file exists to avoid writing header multiple times
    file_exists = os.path.isfile(csv_filename)

    # Save to CSV
    dataset.to_csv(csv_filename, mode='a', index=False, header=not file_exists)
    print(f"New dataset saved to {csv_filename}")

    return dataset


# Generate dataset
dataset = create_dataset()

# requests used up and requests remaining
after_response = requests.get(f"{GITHUB_API}/rate_limit", headers=HEADERS)
reset_time = int(before_response.headers['X-Ratelimit-Reset'])
reset_time = datetime.datetime.fromtimestamp(reset_time)

reset_time = reset_time.strftime('%Y-%m-%d %I:%M:%S %p')

requests_used = int(after_response.headers['X-Ratelimit-Used'])

print(
    f"\033[1m\033[31mRate limits will be reset at: {reset_time} with {requests_used}/5000 requests used\033[0m\n")
