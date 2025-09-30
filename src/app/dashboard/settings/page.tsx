"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "admin@sekolahku.sch.id",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [schoolData, setSchoolData] = useState({
    schoolName: "SekolahKu Digital",
    address: "Jl. Pendidikan No. 123, Jakarta",
    phone: "(021) 1234-5678",
    email: "info@sekolahku.sch.id",
    description: "Membangun generasi cerdas, berakhlak mulia, dan berprestasi",
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pengaturan</h1>
        <p className="text-gray-600">Kelola profil dan pengaturan sekolah</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Akun</CardTitle>
            <CardDescription>Kelola informasi akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-4">Ubah Password</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full">Simpan Perubahan</Button>
          </CardContent>
        </Card>

        {/* School Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Sekolah</CardTitle>
            <CardDescription>Kelola informasi sekolah</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">Nama Sekolah</Label>
              <Input
                id="schoolName"
                value={schoolData.schoolName}
                onChange={(e) => setSchoolData({ ...schoolData, schoolName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={schoolData.address}
                onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                value={schoolData.phone}
                onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolEmail">Email Sekolah</Label>
              <Input
                id="schoolEmail"
                type="email"
                value={schoolData.email}
                onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={schoolData.description}
                onChange={(e) => setSchoolData({ ...schoolData, description: e.target.value })}
                rows={3}
              />
            </div>

            <Button className="w-full">Simpan Perubahan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
