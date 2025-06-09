"use client";

import { useState, useEffect } from "react";
import { createDaily } from "@/lib/actions/createDaily";
import { getMyDailies } from "@/lib/actions/getMyDailies";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type Daily = {
  id: string;
  createdAt: Date;
  userId: string;
  date: Date;
  note: string;
  completed: boolean;
};

export default function TodayPage() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [submittedToday, setSubmittedToday] = useState(false);

  useEffect(() => {
    async function fetchDailies() {
      const res = await getMyDailies();
      setDailies(res);

      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const hasToday = res.some((d) =>
        d.createdAt.toISOString().startsWith(todayStr)
      );
      setSubmittedToday(hasToday);
    }

    fetchDailies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await createDaily(note);
      setSuccess(true);
      setNote("");
      setSubmittedToday(true);

      const updated = await getMyDailies();
      setDailies(updated);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengirim daily.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Hari Ini :</CardTitle>
          </CardHeader>
          <CardContent>
            {submittedToday ? (
              <p className="text-green-600">
                Kamu sudah mengisi daily hari ini.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="• Kerjakan fitur..... • Hadir meeting..... • ... "
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={6}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && (
                  <p className="text-green-500 text-sm">Berhasil disimpan!</p>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : "Kirim Daily"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Daily Kamu :</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dailies.map((daily) => (
              <div key={daily.id}>
                <p className="text-lg text-black font-bold mb-1">
                  Today {format(new Date(daily.createdAt), "do MMMM yyyy")}
                </p>
                <ul className="list-disc pl-5 space-y-1 whitespace-pre-line">
                  {daily.note.split("\n").map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
