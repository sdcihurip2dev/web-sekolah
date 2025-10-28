"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

type Teacher = { id: string; name: string; email: string; subject: string; role: string; createdAt: string };

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", role: "teacher" });
  const [editing, setEditing] = useState<Teacher | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/teachers');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filteredTeachers = items.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-600",
      teacher: "bg-blue-100 text-blue-600",
      staff: "bg-green-100 text-green-600",
    };
    return colors[role as keyof typeof colors] || colors.teacher;
  };

  async function createTeacher(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/teachers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setCreateOpen(false);
      setForm({ name: "", email: "", subject: "", role: "teacher" });
      load();
    }
  }

  function openEdit(t: Teacher) {
    setEditing(t);
    setForm({ name: t.name, email: t.email, subject: t.subject, role: t.role });
    setEditOpen(true);
  }

  async function updateTeacher(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const res = await fetch(`/api/teachers/${editing.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setEditOpen(false);
      setEditing(null);
      load();
    }
  }

  async function deleteTeacher(id: string) {
    if (!confirm('Hapus guru/staf ini?')) return;
    await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Guru & Staf</h1>
        <p className="text-gray-600">Kelola data guru dan staf sekolah</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Daftar Guru & Staf</CardTitle>
              <CardDescription>Total {items.length} guru dan staf terdaftar</CardDescription>
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Guru/Staf
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Guru/Staf</DialogTitle>
                </DialogHeader>
                <form onSubmit={createTeacher} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Nama</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Mata Pelajaran/Jabatan</label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Role</label>
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="px-4 py-2 border rounded-md bg-white w-full">
                      <option value="teacher">Guru</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staf</option>
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Batal</Button>
                    </DialogClose>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-sm text-gray-500 mb-4">Memuat data...</div>}
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama atau mata pelajaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mata Pelajaran/Jabatan</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher, index) => (
                <TableRow key={teacher.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded ${getRoleBadge(teacher.role)}`}>
                      {teacher.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editOpen && editing?.id === teacher.id} onOpenChange={(o) => { if (!o) setEditOpen(false); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => openEdit(teacher)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Guru/Staf</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={updateTeacher} className="space-y-4">
                            <div>
                              <label className="block text-sm mb-1">Nama</label>
                              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Email</label>
                              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Mata Pelajaran/Jabatan</label>
                              <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Role</label>
                              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="px-4 py-2 border rounded-md bg-white w-full">
                                <option value="teacher">Guru</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staf</option>
                              </select>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <DialogClose asChild>
                                <Button type="button" variant="outline">Batal</Button>
                              </DialogClose>
                              <Button type="submit">Simpan</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => deleteTeacher(teacher.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada guru/staf yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
