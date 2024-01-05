import os
import PySimpleGUI as sg
import pandas as pd
import random

data = pd.read_csv('tensorflow/github_users_dataset.csv', header=None)

initial_rows = data.shape[0]

data.dropna(inplace=True)

# Set the column names from the first row
data.columns = data.iloc[0]

# Drop the first row
data = data[1:]

# Drop all rows that are the same as the column names
data = data[~data.eq(data.columns).all(1)]

# Function to check if all strings in a given input are ASCII


def all_strings_are_ascii(input):
    if isinstance(input, list):
        return all(str(s).isascii() for s in input)
    else:
        return str(input).isascii()


# Apply the function to each element of the DataFrame
data_ascii = data.applymap(all_strings_are_ascii)

# Filter out the rows where all elements are ASCII
data = data[data_ascii.all(axis=1)]

data = data.query('projects != "[]" and languages != "[]"')

final_rows = data.shape[0]

print(f'Rows removed: {initial_rows - final_rows}, {100 * (initial_rows - final_rows) / initial_rows:.2f}% of the original dataset')

# Set theme to Dark
sg.theme('Dark')

# Set DPI awareness
sg.set_options(dpi_awareness=True)

# Define the text data
text_data1 = ["Text Area 1", "Text Area 2", "Text Area 3"]
text_data2 = ["Text Area 4", "Text Area 5", "Text Area 6"]

layout = [
    [sg.Multiline(text_data1[0], key='-TEXT0-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True),
     sg.VSeperator(),
     sg.Multiline(text_data2[0], key='-TEXT3-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True)],
    [sg.Multiline(text_data1[1], key='-TEXT1-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True),
     sg.VSeperator(),
     sg.Multiline(text_data2[1], key='-TEXT4-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True)],
    [sg.Multiline(text_data1[2], key='-TEXT2-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True),
     sg.VSeperator(),
     sg.Multiline(text_data2[2], key='-TEXT5-', size=(20, 5), font=("Helvetica", 20), disabled=True, autoscroll=False, expand_x=True)],
    [sg.Button("Match (or skip)", button_color=('white', 'green'), pad=(20, 20), expand_x=True, expand_y=True, font=('Helvetica', 20, 'bold')),
     sg.Button("No Match", button_color=('white', 'red'), pad=(20, 20), expand_x=True, expand_y=True, font=('Helvetica', 20, 'bold'))]
]

# Create the window with a fixed size of 1280x720
window = sg.Window('Label Data', layout,
                   element_justification='center', size=(1280, 720), finalize=True)

# Get the current directory
current_dir = os.path.dirname(os.path.realpath(__file__))

# Open the file in read and write mode
file = open(os.path.join(current_dir, 'negative_match.txt'), 'a+')

# Move the file pointer to the beginning of the file
file.seek(0)

# Read the file contents
file_contents = file.read()
lines = file_contents.splitlines()
numbers = [int(num) for line in lines for num in line.split(',')]
seen_users = set(numbers)


def get_random_index():
    """ Get a random index that has not been used before and is less than len(data) """
    index = random.randint(0, len(data) - 1)
    while index in seen_users:
        index = random.randint(0, len(data) - 1)
    seen_users.add(index)
    return index


def get_user_data(index):
    """ Get the user data from the given index """
    return data.iloc[index]


def update_text_areas(user_data1, user_data2):
    """ Update the text areas with the given user data """
    for i in range(3):
        window[f'-TEXT{i}-'].update(f'{user_data1[i]}')
        window[f'-TEXT{i + 3}-'].update(f'{user_data2[i]}')


def update():
    index1 = get_random_index()
    index2 = get_random_index()
    user_data1 = get_user_data(index1)
    user_data2 = get_user_data(index2)
    update_text_areas(user_data1, user_data2)
    return index1, index2


last_indices = update()


while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED:
        break

    if event == "Match (or skip)":
        pass
    elif event == "No Match":
        file.write(f'\n{last_indices[0]},{last_indices[1]}')
        file.flush()

    last_indices = update()

file.close()
window.close()
