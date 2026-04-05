import { useDemoStore } from "@/store/demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockPipeline = [
  { stage: "Applied", count: 42 },
  { stage: "Screening", count: 18 },
  { stage: "Interview", count: 9 },
  { stage: "Offer", count: 3 },
];

export default function RecruiterDemo() {
  const { openAuthModal } = useDemoStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Recruiter Demo</h1>
        <p className="text-white/50 text-sm">Preview postings, candidate pipeline, and hiring analytics with demo data.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader><CardTitle>Job Postings</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-white/70">
            <p>Senior React Developer — 27 applicants</p>
            <p>Backend Engineer — 19 applicants</p>
            <Button onClick={() => openAuthModal("Post job")} className="w-full mt-2">Post Job</Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle>Candidate Pipeline</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-white/70">
            {mockPipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between">
                <span>{p.stage}</span><span>{p.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle>Hiring Analytics (Demo)</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-white/70">
          <p>30-day views: 3,420</p>
          <p>Applications: 88</p>
          <p>Shortlisted: 14</p>
          <Button variant="outline" onClick={() => openAuthModal("Manage candidates")} className="mt-2">Manage Candidates</Button>
        </CardContent>
      </Card>
    </div>
  );
}
