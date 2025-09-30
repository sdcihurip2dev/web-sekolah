"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const teachers = [
  { id: 1, name: "Drs. Ahmad Suryanto, M.Pd", email: "ahmad@sekolahku.sch.id", role: "admin", subject: "Kepala Sekolah" },
  { id: 2, name: "Ibu Sarah Wijaya, S.Pd", email: "sarah@sekolahku.sch.id", role: "teacher", subject: "Matematika" },
  { id: 3, name: "Pak Budi Hartono, S.Pd", email: "budi@sekolahku.sch.id", role: "teacher", subject: "Fisika" },
  { id: 4, name: "Ibu Rina Kusuma, S.Pd", email: "rina@sekolahku.sch.id", role: "teacher", subject: "Bahasa Indonesia" },
  { id: 5, name: "Pak Andi Pratama, S.Kom", email: "andi@sekolahku.sch.id", role: "teacher", subject: "TIK" },
  { id: 6, name: "Ibu Dewi Lestari, S.Pd", email: "dewi@sekolahku.sch.id", role: "teacher", subject: "Bahasa Inggris" },
  { id: 7, name: "Pak Rizki Fauzi, S.Pd", email: "rizki@sekolahku.sch.id", role: "staff", subject: "Administrasi" },
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
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
              <CardDescription>Total {teachers.length} guru dan staf terdaftar</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Guru/Staf
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
