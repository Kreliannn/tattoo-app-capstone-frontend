"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Ban, HeartPulse, Clock, Droplet, AlertTriangle } from "lucide-react"

export default function TattooClientGuidePage() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-12 mt-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Tattoo Client Guide</h1>
        <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
          Essential information every tattoo client should know — before, during, and after getting tattooed.
          Proper care helps your tattoo heal faster, look better, and stay infection-free.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6">
        {/* Before Your Appointment */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Before Your Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• Get a good night's sleep and eat a proper meal before your session.</p>
            <p>• Stay hydrated in the days leading up to your appointment.</p>
            <p>• Avoid alcohol and blood-thinning medications for 24 hours prior.</p>
            <p>• Wear comfortable clothing that provides easy access to the tattoo area.</p>
            <p>• Bring a valid ID and any reference images if needed.</p>
          </CardContent>
        </Card>

        {/* Healing Stages */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Tattoo Healing Stages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• <strong>Days 1–3:</strong> Redness, swelling, and soreness are normal. Treat like a wound.</p>
            <p>• <strong>Days 4–14:</strong> Peeling, itching, and flaking will occur. Do not scratch.</p>
            <p>• <strong>Weeks 3–6:</strong> Skin looks healed but continues repairing underneath.</p>
            <p>• <strong>Full healing:</strong> Complete healing can take 3–6 months depending on size and placement.</p>
            <Badge variant="outline" className="border-black text-black mt-3">Healing time varies per person</Badge>
          </CardContent>
        </Card>

        {/* Proper Aftercare */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Proper Aftercare</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• Remove bandage after 2–4 hours (or as instructed by your artist).</p>
            <p>• Wash gently with lukewarm water and fragrance-free, antibacterial soap.</p>
            <p>• Pat dry with a clean paper towel — avoid rubbing.</p>
            <p>• Apply a thin layer of recommended ointment (Aquaphor, Hustle Butter, or artist's choice).</p>
            <p>• Moisturize 2–3 times daily, but don't over-apply.</p>
            <p>• Keep tattoo clean and avoid tight or dirty clothing.</p>
            <p>• Wear loose, breathable fabrics during the healing process.</p>
          </CardContent>
        </Card>

        {/* What NOT to Do */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">What You Should NOT Do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• Do NOT scratch, pick, or peel the tattoo under any circumstances.</p>
            <p>• Avoid swimming pools, hot tubs, beaches, and soaking for at least 2–3 weeks.</p>
            <p>• Do NOT expose to direct sunlight — UV rays will fade your tattoo.</p>
            <p>• Avoid alcohol and excessive sweating during the first week.</p>
            <p>• Do NOT use petroleum jelly, Vaseline, or scented lotions.</p>
            <p>• Avoid tight clothing or anything that rubs against the tattoo.</p>
            <p>• Do NOT shave over the tattooed area until fully healed.</p>
          </CardContent>
        </Card>

        {/* Infection Prevention */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Preventing Infections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• Always wash your hands thoroughly before touching your tattoo.</p>
            <p>• Use only clean towels, bedding, and clothing.</p>
            <p>• Avoid contact with pets, dirt, and unsanitary surfaces.</p>
            <p>• Never let anyone else touch your fresh tattoo.</p>
            <p>• Do not share ointments, towels, or touch others' healing tattoos.</p>
            <p>• Follow your artist's aftercare instructions strictly — they know best.</p>
            <p>• Keep your environment clean, especially where you sleep.</p>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="bg-black border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-white rounded-lg">
              <AlertTriangle className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Warning Signs of Infection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300 leading-relaxed">
            <p>• Excessive swelling or redness that worsens after several days</p>
            <p>• Yellow, green, or foul-smelling discharge</p>
            <p>• Red streaks radiating from the tattoo</p>
            <p>• Fever, chills, or severe pain that doesn't subside</p>
            <p>• Unusual warmth or heat coming from the tattooed area</p>
            <Separator className="bg-gray-700 my-4" />
            <p className="text-sm text-white font-semibold">⚠️ If any of these symptoms appear, consult a medical professional immediately. Do not wait.</p>
          </CardContent>
        </Card>

        {/* Long-Term Care */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Long-Term Tattoo Care</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• Always apply SPF 50+ sunscreen when exposed to sunlight.</p>
            <p>• Moisturize regularly to keep skin and ink vibrant.</p>
            <p>• Stay hydrated and maintain healthy skin overall.</p>
            <p>• Touch-ups may be needed every few years depending on placement and sun exposure.</p>
            <p>• Avoid extreme weight fluctuations that can distort the tattoo.</p>
          </CardContent>
        </Card>

        {/* Final Tip */}
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A tattoo is a lifelong commitment. Proper care ensures it stays bold, clean, and beautiful for years to come.
            Trust your artist, follow their advice, and enjoy your new art.
          </p>
        </div>
      </div>
    </div>
  )
}