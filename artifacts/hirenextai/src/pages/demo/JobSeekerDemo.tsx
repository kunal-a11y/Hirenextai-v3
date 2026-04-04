import { useDemoStore } from "@/store/demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockJobs = [
  { id: 1, title: "Frontend Developer", company: "TCS", location: "Bangalore", match: 91 },
  { id: 2, title: "Python Developer", company: "Infosys", location: "Pune", match: 87 },
  { id: 3, title: "QA Engineer", company: "Wipro", location: "Hyderabad", match: 83 },
];

export default function JobSeekerDemo() {
  const { openAuthModal } = useDemoStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Job Seeker Demo</h1>
        <p className="text-white/50 text-sm">Explore recommendations, applications, and profile preview with demo data.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {mockJobs.map((job) => (
          <Card key={job.id} className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">{job.title}</CardTitle>
              <p className="text-xs text-white/50">{job.company} · {job.location}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-emerald-400">{job.match}% match</p>
              <Button onClick={() => openAuthModal("Apply job")} className="w-full">Apply Job</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle>Application Tracker (Demo)</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-white/70">
          <p>Frontend Developer — Applied</p>
          <p>Data Analyst — Interview</p>
          <p>QA Engineer — Saved</p>
          <Button variant="outline" onClick={() => openAuthModal("Update profile")} className="mt-2">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
