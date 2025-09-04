
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { courses as initialCourses, blogPosts as initialBlogPosts, resources as initialResources } from "@/lib/data";
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import type { Course, BlogPost, Resource } from "@/lib/types";

type ItemType = 'course' | 'blog' | 'resource';

export default function AdminDashboardPage() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [resources, setResources] = useState<Resource[]>(initialResources);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{type: ItemType, id: string} | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Course | BlogPost | Resource | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [activeTab, setActiveTab] = useState<ItemType>('course');

    const openConfirmationDialog = (type: ItemType, id: string) => {
        setItemToDelete({ type, id });
        setDialogOpen(true);
    };

    const handleDelete = () => {
        if (!itemToDelete) return;
        const { type, id } = itemToDelete;
        if (type === 'course') setCourses(courses.filter(c => c.id !== id));
        if (type === 'blog') setBlogPosts(blogPosts.filter(b => b.slug !== id));
        if (type === 'resource') setResources(resources.filter(r => r.id !== id));
        setDialogOpen(false);
        setItemToDelete(null);
    };
    
    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({});
        setIsFormOpen(true);
    };

    const handleEdit = (item: Course | BlogPost | Resource) => {
        setEditingItem(item);
        setFormData(item);
        setIsFormOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'tags' || name === 'syllabus') {
            setFormData({ ...formData, [name]: value.split(',').map(s => s.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const getNewId = (prefix: string) => `${prefix}-${Date.now()}`;

        if (editingItem) { // Update existing item
            if (activeTab === 'course') setCourses(courses.map(c => c.id === (editingItem as Course).id ? formData : c));
            if (activeTab === 'blog') setBlogPosts(blogPosts.map(b => b.slug === (editingItem as BlogPost).slug ? formData : b));
            if (activeTab === 'resource') setResources(resources.map(r => r.id === (editingItem as Resource).id ? formData : r));
        } else { // Add new item
            if (activeTab === 'course') {
                const newCourse: Course = {
                    ...formData,
                    id: getNewId('course'),
                    image: 'https://picsum.photos/seed/new-course/600/400' 
                };
                setCourses([newCourse, ...courses]);
            }
            if (activeTab === 'blog') {
                const newPost: BlogPost = {
                    ...formData,
                    slug: getNewId('blog'),
                    image: 'https://picsum.photos/seed/new-post/800/450'
                };
                setBlogPosts([newPost, ...blogPosts]);
            }
            if (activeTab === 'resource') {
                 const newResource: Resource = {
                    ...formData,
                    id: getNewId('resource'),
                    fileUrl: '#'
                };
                setResources([newResource, ...resources]);
            }
        }
        setIsFormOpen(false);
    };

    const renderFormFields = () => {
        switch(activeTab) {
            case 'course': return (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={formData.description || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fees">Fees</Label>
                        <Input id="fees" name="fees" value={formData.fees || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" name="duration" value={formData.duration || ''} onChange={handleFormChange} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="syllabus">Syllabus (comma-separated)</Label>
                        <Textarea id="syllabus" name="syllabus" value={Array.isArray(formData.syllabus) ? formData.syllabus.join(', ') : ''} onChange={handleFormChange} />
                    </div>
                </>
            );
            case 'blog': return (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" name="author" value={formData.author || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" name="date" type="date" value={formData.date || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={formData.category || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="content">Content (HTML)</Label>
                        <Textarea id="content" name="content" value={formData.content || ''} onChange={handleFormChange} rows={10} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input id="tags" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={handleFormChange} />
                    </div>
                </>
            );
            case 'resource': return (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={formData.description || ''} onChange={handleFormChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type (PDF, Worksheet, Quiz)</Label>
                        <Input id="type" name="type" value={formData.type || ''} onChange={handleFormChange} />
                    </div>
                </>
            );
            default: return null;
        }
    }


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
                    <Tabs defaultValue="courses" onValueChange={(value) => setActiveTab(value as ItemType)}>
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                                <TabsTrigger value="resources">Resources</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
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
                                                                <DropdownMenuItem onClick={() => handleEdit(course)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
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
                                                                <DropdownMenuItem onClick={() => handleEdit(post)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
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
                                                                <DropdownMenuItem onClick={() => handleEdit(resource)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
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
                            This action cannot be undone. This will permanently delete this item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Yes, delete it
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-[425px] md:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}</DialogTitle>
                        <DialogDescription>
                           {editingItem ? `Make changes to your ${activeTab} here.` : `Add a new ${activeTab} to your site.`} Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                           {renderFormFields()}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

    