"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";
import { useAuth } from "@/lib/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import ListItem from "@/components/component/projects/list-item";
import { getLanguages } from "@/lib/get-repos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus } from "@/components/ui/icons";

const recommended_projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description 3",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Description 4",
  },
];

const Projects = () => {
  const router = useRouter();
  const userData = useAuth(router);
  const [languages, setLanguages] = useState<{ [key: string]: string }>({});

  // this will be used to show/hide the navbar when the modal is open
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    console.log("Opening modal, hiding navbar");
    setIsNavbarVisible(false);
    setIsModalOpen(true);
  };

  //this is a
  const handleCloseModal = () => {
    console.log("Closing modal, showing navbar");
    setIsNavbarVisible(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      if (userData && userData.repositories) {
        const fetchPromises = userData.repositories
          .map((repo: { languages_url: string; name: any }) =>
            repo.languages_url
              ? getLanguages(repo.languages_url, userData.accessToken).then(
                  (langData) => ({
                    name: repo.name,
                    langData,
                  }),
                )
              : null,
          )
          .filter((p: null) => p !== null); // filters out null promises

        const results = await Promise.all(fetchPromises);
        const newLanguages = results.reduce(
          // reduces the array of objects into a single object
          (acc, { name, langData }) => {
            acc[name] = langData;
            return acc;
          },
          {},
        );

        setLanguages(newLanguages);
      }
    };

    fetchLanguages();
  }, [userData]);

  return (
    <>
      {isNavbarVisible && (
        <div className="flex w-full max-w-full flex-row border">
          <NavbarLarge projects={true} />
        </div>
      )}
      <main className="flex justify-between p-12">
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="text-3xl font-bold ">My Projects</h1>
              <p>Click on any project to edit information</p>
            </div>
            <Button className="mr-8">
              <IconPlus className="mr-2" />
              Add Project
            </Button>
          </div>
          <div className="w-full">
            <AnimatePresence>
              {userData ? (
                <ScrollArea className="h-[95vh]">
                  <GridContainer>
                    {userData?.repositories
                      .sort((a: any, b: any) => {
                        const aPoints =
                          JSON.parse(a.points)?.bullet_points || [];
                        const bPoints =
                          JSON.parse(b.points)?.bullet_points || [];
                        if (aPoints.length > 0 && bPoints.length === 0) {
                          return -1; // if a has points and b doesn't, a comes first
                        }
                        if (aPoints.length === 0 && bPoints.length > 0) {
                          return 1; // inversely
                        }
                        return 0; // if both have points or both don't, order doesn't matter
                      })
                      .map((repository: any, index: number) => (
                        <div
                          key={index}
                          className="h-full max-h-full w-full max-w-full "
                        >
                          <GridItem
                            key={index}
                            title={repository.name}
                            description={repository.description || ""}
                            points={
                              JSON.parse(repository.points)?.bullet_points || [
                                "",
                                "",
                                "",
                              ]
                            }
                            languages={languages[repository.name] || {}}
                            userData={userData}
                          />
                        </div>
                      ))}
                  </GridContainer>
                </ScrollArea>
              ) : (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[70vh] w-full items-center justify-center text-xl text-muted-foreground"
                >
                  {" "}
                  Loading...{" "}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* <div className="flex">
					<Separator
						orientation="vertical"
						className="h-auto mx-12 bg-white dark:bg-zinc-700"
					/>
					<div className="flex-col flex min-w-max flex-grow max-w-xl">
						<div className="mb-6">
							<h1 className="text-3xl font-bold">
								Recommended Projects
							</h1>
							<p>Choose a project to view</p>
						</div>
						<div className="space-y-8">
							{recommended_projects.map((project, index) => (
								<ListItem
									key={index}
									title={project.title}
									description={project.description}
								/>
							))}
						</div>
					</div>
				</div> */}
      </main>
    </>
  );
};

export default Projects;
