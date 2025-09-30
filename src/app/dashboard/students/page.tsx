"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const students = [
  { id: 1, name: "Ahmad Fauzi", class: "X-A", parentContact: "0812-3456-7890" },
  { id: 2, name: "Siti Nurhaliza", class: "X-A", parentContact: "0813-4567-8901" },
  { id: 3, name: "Budi Santoso", class: "X-B", parentContact: "0814-5678-9012" },
  { id: 4, name: "Dewi Lestari", class: "X-B", parentContact: "0815-6789-0123" },
  { id: 5, name: "Rizki Pratama", class: "XI-A", parentContact: "0816-7890-1234" },
  { id: 6, name: "Maya Sari", class: "XI-A", parentContact: "0817-8901-2345" },
  { id: 7, name: "Andi Wijaya", class: "XI-B", parentContact: "0818-9012-3456" },
  { id: 8, name: "Putri Ayu", class: "XI-B", parentContact: "0819-0123-4567" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

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
              <CardDescription>Total {students.length} siswa terdaftar</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Siswa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
