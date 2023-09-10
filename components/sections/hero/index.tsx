import Link from 'next/link';
import React from 'react'

const Hero = () => {
  return (
    <section className="max-w-[1500px] mx-auto  min-h-[90vh] flex justify-center pt-14">
      <div className="hero-content">
        <div className='flex items-center flex-col gap-5'>
          <h1 className="text-[75px] font-bold tracking-wider leading-[50px]">Your Links, Your Way.</h1>
          <p className="text-2xl ">
            Create a personalized link page and make every link count.
          </p>
          <div className="flex gap-4">
            <Link href="/auth?type=login" className="">
              <button className="bg-primary hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
                Claim Link
              </button>
            </Link>
            <Link href="/demo" className="">
              <button className="bg-accentLight hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-black p-3 font-medium px-6 rounded-lg">
                See Demo
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-image">{/* Add an image or illustration here */}</div>
    </section>
  );
}

export default Hero
