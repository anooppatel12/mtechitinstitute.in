
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, LogOut, Trash, Edit, Settings } from "lucide-react";
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
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import type { Course, BlogPost, Resource } from "@/lib/types";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged, signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';


type ItemType = 'courses' | 'blog' | 'resources' | 'settings';

export default function AdminDashboardPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchData = async () => {
        setLoading(true);
        try {
            const coursesCollection = collection(db, "courses");
            const courseSnapshot = await getDocs(coursesCollection);
            const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
            setCourses(courseList);

            const blogQuery = query(collection(db, "blog"), orderBy("date", "desc"));
            const blogSnapshot = await getDocs(blogQuery);
            const blogList = blogSnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as BlogPost));
            setBlogPosts(blogList);

            const resourcesCollection = collection(db, "resources");
            const resourceSnapshot = await getDocs(resourcesCollection);
            const resourceList = resourceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
            setResources(resourceList);

        } catch (error) {
            console.error("Error fetching data: ", error);
             toast({ title: "Error", description: "Could not fetch data.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                fetchData();
            } else {
                // User is signed out.
                // Redirect to login page if you want to protect this route
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{type: ItemType, id: string} | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Course | BlogPost | Resource | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [activeTab, setActiveTab] = useState<ItemType>('courses');
    
    const [settingsFormData, setSettingsFormData] = useState({
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const openConfirmationDialog = (type: ItemType, id: string) => {
        setItemToDelete({ type, id });
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        const { type, id } = itemToDelete;
        
        try {
            if (type === 'courses') await deleteDoc(doc(db, "courses", id));
            if (type === 'blog') await deleteDoc(doc(db, "blog", id));
            if (type === 'resources') await deleteDoc(doc(db, "resources", id));
            await fetchData(); // Refetch all data
            toast({ title: "Success", description: "Item deleted successfully." });
        } catch (error) {
            console.error("Error deleting document: ", error);
             toast({ title: "Error", description: "Could not delete item.", variant: "destructive" });
        }

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
    
    const createSlug = (title: string) => {
      if (!title) return '';
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters
        .trim()
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    };

    const convertToDirectDownloadLink = (url: string): string => {
        if (!url) return url;
        const gDriveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
        const match = url.match(gDriveRegex);
        if (match && match[1]) {
            const fileId = match[1];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return url; // Return original URL if it doesn't match
    };


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (activeTab === 'courses') {
                const courseData = { ...formData, image: formData.image || `https://picsum.photos/seed/${formData.title || 'course'}/600/400` };
                delete courseData.id;
                if (editingItem) {
                    const courseDoc = doc(db, "courses", (editingItem as Course).id);
                    await updateDoc(courseDoc, courseData);
                } else {
                    await addDoc(collection(db, "courses"), courseData);
                }
            } else if (activeTab === 'blog') {
                const blogData = { ...formData, image: formData.image || `https://picsum.photos/seed/${formData.title || 'blog'}/800/450` };
                if (editingItem) {
                    const slug = (editingItem as BlogPost).slug;
                    delete blogData.slug;
                    const blogDoc = doc(db, "blog", slug);
                    await updateDoc(blogDoc, blogData);
                } else {
                    const newSlug = createSlug(formData.title);
                    if (!newSlug) {
                        console.error("Cannot create blog post without a title.");
                        toast({ title: "Error", description: "Blog post must have a title.", variant: "destructive" });
                        return;
                    }
                    const newPostData = { ...blogData };
                    delete newPostData.slug;
                    await setDoc(doc(db, "blog", newSlug), newPostData);
                }
            } else if (activeTab === 'resources') {
                const resourceData = { ...formData };
                if (resourceData.fileUrl) {
                    resourceData.fileUrl = convertToDirectDownloadLink(resourceData.fileUrl);
                }
                delete resourceData.id;
                 if (editingItem) {
                    const resourceDoc = doc(db, "resources", (editingItem as Resource).id);
                    await updateDoc(resourceDoc, resourceData);
                } else {
                    await addDoc(collection(db, "resources"), resourceData);
                }
            }
            await fetchData(); // Refetch data
            toast({ title: "Success", description: "Data saved successfully." });
        } catch(error) {
            console.error("Error saving document: ", error);
             toast({ title: "Error", description: "Could not save data.", variant: "destructive" });
        }

        setIsFormOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettingsFormData({ ...settingsFormData, [name]: value });
    };

    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { currentPassword, newEmail, newPassword, confirmNewPassword } = settingsFormData;

        if (newPassword && newPassword !== confirmNewPassword) {
            toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
            return;
        }

        const user = auth.currentUser;
        if (!user || !user.email) {
            toast({ title: "Error", description: "No user is signed in.", variant: "destructive" });
            return;
        }
        
        try {
            // Re-authenticate the user before making sensitive changes
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update email if a new one is provided
            if (newEmail && newEmail !== user.email) {
                await updateEmail(user, newEmail);
                toast({ title: "Success", description: "Email updated successfully." });
            }

            // Update password if a new one is provided
            if (newPassword) {
                await updatePassword(user, newPassword);
                toast({ title: "Success", description: "Password updated successfully." });
            }

            if (!newEmail && !newPassword) {
                 toast({ title: "Info", description: "No changes were submitted." });
            }
            
             setSettingsFormData({
                currentPassword: '',
                newEmail: '',
                newPassword: '',
                confirmNewPassword: ''
            });


        } catch(error: any) {
            let errorMessage = "An error occurred."
             if (error.code) {
                switch (error.code) {
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage = 'Incorrect current password.';
                        break;
                     case 'auth/email-already-in-use':
                        errorMessage = 'This email address is already in use by another account.';
                        break;
                    default:
                        errorMessage = 'Failed to update credentials. Please try again.';
                        break;
                }
            }
            console.error("Error updating credentials:", error);
            toast({ title: "Error", description: errorMessage, variant: "destructive" });
        }
    };


    const renderFormFields = () => {
        switch(activeTab) {
            case 'courses': return (
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
            case 'resources': return (
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
                    <div className="grid gap-2">
                        <Label htmlFor="fileUrl">File URL</Label>
                        <Input id="fileUrl" name="fileUrl" value={formData.fileUrl || ''} onChange={handleFormChange} placeholder="https://drive.google.com/file/d/..."/>
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
                        <Button variant="outline" size="icon" asChild onClick={() => signOut(auth)}>
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
                                <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4"/>Settings</TabsTrigger>
                            </TabsList>
                             <div className="ml-auto flex items-center gap-2">
                                {activeTab !== 'settings' && (
                                <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add New
                                    </span>
                                </Button>
                                )}
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
                                    {loading ? <p>Loading courses...</p> :
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
                                                                <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog('courses', course.id)}>
                                                                    <Trash className="mr-2 h-4 w-4" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    }
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
                                     {loading ? <p>Loading blog posts...</p> :
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
                                    }
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
                                     {loading ? <p>Loading resources...</p> :
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
                                                                <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog('resources', resource.id)}>
                                                                    <Trash className="mr-2 h-4 w-4" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                     }
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Admin Settings</CardTitle>
                                    <CardDescription>Update your administrator credentials.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSettingsSubmit} className="space-y-4 max-w-md">
                                        <div className="grid gap-2">
                                            <Label htmlFor="newEmail">Admin Email</Label>
                                            <Input id="newEmail" name="newEmail" type="email" placeholder="new.admin@example.com" value={settingsFormData.newEmail} onChange={handleSettingsChange}/>
                                        </div>
                                         <div className="grid gap-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <Input id="currentPassword" name="currentPassword" type="password" required value={settingsFormData.currentPassword} onChange={handleSettingsChange}/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input id="newPassword" name="newPassword" type="password" placeholder="Leave blank to keep current password" value={settingsFormData.newPassword} onChange={handleSettingsChange}/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                                            <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={settingsFormData.confirmNewPassword} onChange={handleSettingsChange}/>
                                        </div>
                                        <Button type="submit">Update Settings</Button>
                                    </form>
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
                        <DialogTitle>{editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}</DialogTitle>
                        <DialogDescription>
                           {editingItem ? `Make changes to your ${activeTab.slice(0, -1)} here.` : `Add a new ${activeTab.slice(0, -1)} to your site.`} Click save when you're done.
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
