
"use client";

import Link from "next/link";
import { useState } from "react";
import { PlusCircle, MoreHorizontal, LogOut, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { courses as initialCourses, blogPosts as initialBlogPosts, resources as initialResources } from "@/lib/data";
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import type { Course, BlogPost, Resource } from "@/lib/types";

export default function AdminDashboardPage() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [resources, setResources] = useState<Resource[]>(initialResources);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{type: 'course' | 'blog' | 'resource', id: string} | null>(null);

    const openConfirmationDialog = (type: 'course' | 'blog' | 'resource', id: string) => {
        setItemToDelete({ type, id });
        setDialogOpen(true);
    };

    const handleDelete = () => {
        if (!itemToDelete) return;

        switch (itemToDelete.type) {
            case 'course':
                setCourses(courses.filter(c => c.id !== itemToDelete.id));
                break;
            case 'blog':
                setBlogPosts(blogPosts.filter(p => p.slug !== itemToDelete.id));
                break;
            case 'resource':
                setResources(resources.filter(r => r.id !== itemToDelete.id));
                break;
        }
        setDialogOpen(false);
        setItemToDelete(null);
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <Logo />
                    <div className="ml-auto">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/login">
                                <LogOut className="h-4 w-4" />
                                <span className="sr-only">Logout</span>
                            </Link>
                        </Button>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <Tabs defaultValue="courses">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                                <TabsTrigger value="resources">Resources</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add New
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="courses">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Courses</CardTitle>
                                    <CardDescription>
                                        Manage your institute's courses.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Fees</TableHead>
                                                <TableHead>Duration</TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {courses.map(course => (
                                                <TableRow key={course.id}>
                                                    <TableCell className="font-medium">{course.title}</TableCell>
                                                    <TableCell>{course.fees}</TableCell>
                                                    <TableCell>{course.duration}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog('course', course.id)}>
                                                                    <Trash className="mr-2 h-4 w-4" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="blog">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Blog Posts</CardTitle>
                                    <CardDescription>
                                        Manage your blog articles.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Author</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {blogPosts.map(post => (
                                                <TableRow key={post.slug}>
                                                    <TableCell className="font-medium">{post.title}</TableCell>
                                                    <TableCell>{post.author}</TableCell>
                                                    <TableCell>{post.date}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                 <DropdownMenuSeparator />
                                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog('blog', post.slug)}>
                                                                    <Trash className="mr-2 h-4 w-4" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="resources">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Resources</CardTitle>
                                    <CardDescription>
                                        Manage your student resources.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {resources.map(resource => (
                                                <TableRow key={resource.id}>
                                                    <TableCell className="font-medium">{resource.title}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{resource.type}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                 <DropdownMenuSeparator />
                                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog('resource', resource.id)}>
                                                                    <Trash className="mr-2 h-4 w-4" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this item from your data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Yes, delete it
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
