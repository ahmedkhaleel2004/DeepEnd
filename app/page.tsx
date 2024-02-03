"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/component/navbars/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconGitHub } from "@/components/ui/icons";

import MainCard from "@/components/component/home/main-card";
import ProfileCard from "@/components/component/home/profile-card";
import AccordianQuestions from "@/components/component/home/accordian-questions";
import { signInFunc } from "@/lib/sign-in-or-create";
import Modal from "@/components/component/projects/modal";
import { BiPhone } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { AiFillLinkedin } from "react-icons/ai";
// import Image from "next/image";
import { motion } from "framer-motion";
export default function Home() {
  const router = useRouter();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleSignIn = async () => {
    await signInFunc(
      router,
      () => setIsCreatingAccount(true),
      () => setIsCreatingAccount(false),
    );
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-[80rem] px-12">
        <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-2 ">
          <div className="">
            <h1 className="pb-6 pt-24 text-5xl font-bold">
              Your Personal Project Partner
            </h1>
            <h2 className="text-base font-normal">
              Linus is the self-learning copilot for aspiring software engineers
            </h2>
            <div className="mt-5">
              <Button
                className="hover:bg-zinc-50 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                onClick={handleSignIn}
              >
                <IconGitHub className="mr-2 h-5 w-5" />
                Sign in with GitHub
              </Button>
              <Modal isOpen={isCreatingAccount} handleClose={() => {}}>
                <Card className="flex flex-col items-center justify-center">
                  <CardHeader>
                    <CardTitle>Creating Account</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <CardDescription>
                      Your account is being created. This will take a few
                      seconds.
                    </CardDescription>
                    <div className="mt-8 h-16 w-16 animate-spin  rounded-full border-t-2 border-foreground" />
                  </CardContent>
                </Card>
              </Modal>
            </div>
          </div>
          <Card className="rounded-3xl bg-background/80 shadow-lg">
            <CardHeader>
              <CardTitle>Try it out!</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Demo here</h1>
            </CardContent>
          </Card>
        </div>
        <Separator className="my-16 bg-white dark:bg-zinc-700" />
        <div className="mb-6">
          <h1 className="text-center text-3xl font-bold">About</h1>
        </div>
        <div className="grid grid-cols-2 gap-4" id="about">
          <div>
            <h1 className="text-3xl">maybe header here</h1>
            <p>There will be text here. This is just sample text here ok.</p>
          </div>
          <div>
            <h1>There would be a background/image here</h1>
          </div>
        </div>
        <div id="features">
          <Separator className="my-16 bg-white dark:bg-zinc-700" />
          <Card className="rounded-3xl bg-background/80 pb-8">
            <CardHeader className="my-4 text-center">
              <CardTitle className="text-3xl">
                End-to-end project guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-8 flex space-x-16">
                <MainCard
                  title="Chatbot"
                  description="Get personally curated advice on
												your career in the tech
												industry."
                />
                <MainCard
                  title="Recommendation"
                  description="Receive project ideas based on
												your own experience and goals."
                />
                <MainCard
                  title="Timeline"
                  description="Generate specific timelines
												including technical guidance."
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator className="mb-12 mt-12 bg-white dark:bg-zinc-700" />
        <div>
          <div>
            <h1 className="pb-5 text-center text-2xl font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <AccordianQuestions
            question={"How does it work?"}
            answer={
              "This is sample text. This is sample text. This is sampletext"
            }
            valueItem={"item-1"}
          />
          <AccordianQuestions
            question={"Can i Trust Linus with my Information?"}
            answer={
              "You can trust us. You can trust us. You can trust us. You can trust us. we are not facebook........"
            }
            valueItem={"item-2"}
          />
          <AccordianQuestions
            question={
              "What sets this AI tool different from ones in the market?"
            }
            answer={"Its just better. Its just better. and better."}
            valueItem={"item-3"}
          />
        </div>
        <Separator className="mb-12 mt-12 bg-white dark:bg-zinc-700" />
        {/*about us*/}
        <div>
          <h1 className="pb-5 text-center text-2xl font-bold">
            {" Developers of Linus"}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="m-4 flex flex-col items-center">
            <ProfileCard
              username="Ahmed Khaleel"
              imageSrc="/jbp.png"
              links={[
                {
                  url: "https://www.linkedin.com/in/ahmedkhaleel/",
                  icon: <AiFillLinkedin />,
                },
                // more links
              ]}
            />
          </div>
          <div className="m-4 flex flex-col items-center">
            <ProfileCard
              username="Shaaf Shahzad"
              imageSrc="/jbp.png"
              links={[
                {
                  url: "https://www.linkedin.com/in/ahmedkhaleel/",
                  icon: <AiFillLinkedin />,
                },
              ]}
            />
          </div>
          <div className="m-4 flex flex-col items-center">
            <ProfileCard
              username="Omar Ramadan"
              imageSrc="/jbp.png"
              links={[
                {
                  url: "https://www.linkedin.com/in/ahmedkhaleel/",
                  icon: <AiFillLinkedin />,
                },
              ]}
            />
          </div>
          <div className="m-4 flex flex-col items-center">
            <ProfileCard
              username="Benjamin Avdullahu"
              imageSrc="/jbp.png"
              links={[
                {
                  url: "https://www.linkedin.com/in/ahmedkhaleel/",
                  icon: <AiFillLinkedin />,
                },
              ]}
            />
          </div>
        </div>
        <Separator className="mb-6 mt-6 bg-white dark:bg-zinc-700" />

        <footer className="text pt-5">
          <div>
            <p className="text-center text-lg font-bold">Contact Us</p>
            <div id="contact">
              <div>
                <p className="pt-3">Linus</p>
                {/*<Image
									src="/LinusLogoSVG.svg"
									width={50}
									height={50}
									alt="Linus Logo"
									/>*/}
              </div>
              <div>
                <div className="flex justify-center space-x-4 pt-4 text-center">
                  <a
                    href="tel:123123123"
                    className="text-blue-500 hover:text-blue-800"
                  >
                    <BiPhone className="h-8 w-8" />
                  </a>
                  <a href="mailto:zakamm@gmail.com?subject=Feedback&body=Message">
                    <CgMail className="h-8 w-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
