"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

type Student = { id: string; name: string; class: string; parentContact: string | null; createdAt: string };

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [items, setItems] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", class: "", parentContact: "" });
  const [editing, setEditing] = useState<Student | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filteredStudents = items.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  async function createStudent(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/students', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, class: form.class, parentContact: form.parentContact || null }),
    });
    if (res.ok) {
      setCreateOpen(false);
      setForm({ name: "", class: "", parentContact: "" });
      load();
    }
  }

  function openEdit(s: Student) {
    setEditing(s);
    setForm({ name: s.name, class: s.class, parentContact: s.parentContact || "" });
    setEditOpen(true);
  }

  async function updateStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const res = await fetch(`/api/students/${editing.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, class: form.class, parentContact: form.parentContact || null }),
    });
    if (res.ok) {
      setEditOpen(false);
      setEditing(null);
      load();
    }
  }

  async function deleteStudent(id: string) {
    if (!confirm('Hapus siswa ini?')) return;
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manajemen Siswa</h1>
        <p className="text-gray-600">Kelola data siswa sekolah</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Daftar Siswa</CardTitle>
              <CardDescription>Total {items.length} siswa terdaftar</CardDescription>
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Siswa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Siswa</DialogTitle>
                </DialogHeader>
                <form onSubmit={createStudent} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Nama</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Kelas</label>
                    <Input value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Kontak Orang Tua</label>
                    <Input value={form.parentContact} onChange={(e) => setForm({ ...form, parentContact: e.target.value })} />
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
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">Semua Kelas</option>
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
            </select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Kontak Orang Tua</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.parentContact}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editOpen && editing?.id === student.id} onOpenChange={(o) => { if (!o) setEditOpen(false); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => openEdit(student)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Siswa</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={updateStudent} className="space-y-4">
                            <div>
                              <label className="block text-sm mb-1">Nama</label>
                              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Kelas</label>
                              <Input value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} required />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Kontak Orang Tua</label>
                              <Input value={form.parentContact} onChange={(e) => setForm({ ...form, parentContact: e.target.value })} />
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
                      <Button variant="ghost" size="sm" onClick={() => deleteStudent(student.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada siswa yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
