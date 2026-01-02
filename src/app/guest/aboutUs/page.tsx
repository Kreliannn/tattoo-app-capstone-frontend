"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Lightbulb, Award, Code, Heart } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-12 mt-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          We are a team of college students from NCST Dasmariñas, passionate about transforming the tattoo industry through innovative technology.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6">
        {/* Project Overview */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Our Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <strong>Development of a Web-Based Integrated Management Platform for Tattoo Services with Decision Support System, 3D Tattoo Customization, Smart Pricing System and Mobile Application in Cavite</strong>
            </p>
            <p>
              This capstone project represents our commitment to bridging the gap between traditional tattoo artistry and modern technology. We're creating a comprehensive digital solution that serves both tattoo artists and clients in Cavite and beyond.
            </p>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              To revolutionize the tattoo industry in Cavite by providing an integrated digital platform that streamlines operations, enhances client experience, and empowers tattoo artists with cutting-edge tools for business management and creative design.
            </p>
            <p>
              We aim to make tattoo services more accessible, transparent, and efficient through technology-driven solutions that benefit both artists and clients.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="bg-black border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-white rounded-lg">
              <Lightbulb className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">What We're Building</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300 leading-relaxed">
            <p>• <strong className="text-white">Integrated Management Platform:</strong> Comprehensive tools for appointment scheduling, client management, and business operations.</p>
            <p>• <strong className="text-white">Decision Support System:</strong> Data-driven insights to help artists and shop owners make informed business decisions.</p>
            <p>• <strong className="text-white">3D Tattoo Customization:</strong> Interactive visualization tool allowing clients to preview tattoos on their body before commitment.</p>
            <p>• <strong className="text-white">Smart Pricing System:</strong> Intelligent pricing calculator based on size, complexity, placement, and artist expertise.</p>
            <p>• <strong className="text-white">Mobile Application:</strong> Convenient access to all features on-the-go for both artists and clients.</p>
          </CardContent>
        </Card>

        {/* Who We Are */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Who We Are</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              We are Information Technology students at <strong>National College of Science and Technology (NCST) Dasmariñas</strong>, working together to develop this innovative platform as our capstone project.
            </p>
            <p>
              Our team combines technical expertise with a passion for solving real-world problems in the local tattoo industry. Through extensive research and consultation with tattoo artists and clients in Cavite, we've identified key pain points and designed solutions that address genuine needs.
            </p>
          </CardContent>
        </Card>

        {/* Our Vision */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              To become the leading digital platform for tattoo services in Cavite, setting new standards for professionalism, transparency, and client satisfaction in the industry.
            </p>
            <p>
              We envision a future where getting a tattoo is a seamless, informed, and confident experience—from initial design exploration to final artwork—supported by technology that respects the artistry and craft of tattooing.
            </p>
          </CardContent>
        </Card>

        {/* Our Commitment */}
        <Card className="bg-white border-2 border-black shadow-none hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <div className="p-2 bg-black rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Our Commitment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 leading-relaxed">
            <p>• <strong>Innovation:</strong> Continuously improving our platform with the latest technologies.</p>
            <p>• <strong>Quality:</strong> Delivering reliable, user-friendly solutions that exceed expectations.</p>
            <p>• <strong>Support:</strong> Providing comprehensive guidance and assistance to our users.</p>
            <p>• <strong>Community:</strong> Building strong relationships within the local tattoo community.</p>
            <p>• <strong>Safety:</strong> Prioritizing hygiene standards, ethical practices, and client education.</p>
          </CardContent>
        </Card>

        {/* Closing Statement */}
        <div className="text-center py-8 border-t-2 border-black mt-6">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
            This platform is more than just a project—it's our contribution to elevating the tattoo industry in Cavite through technology, innovation, and a genuine passion for making a difference.
          </p>
          <p className="text-black font-semibold text-xl">
            NCST Dasmariñas | Information Technology | Capstone Project 2025
          </p>
        </div>
      </div>
    </div>
  )
}