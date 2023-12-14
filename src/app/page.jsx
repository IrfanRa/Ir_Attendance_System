import Image from 'next/image'
import Hero from './components/shared/HeroSection'

export default function Home() {
  return (
    <main className="p-[20px] flex flex-col items-center">
        <h2 className="text-xl text-gray-600 font-bold bg-transparent mb-4">Welcome to the the Secure Attendance Systeme based on Blockchain Technology.</h2>
        <section>
          <Hero/>
        </section>
      </main>
  )
}
