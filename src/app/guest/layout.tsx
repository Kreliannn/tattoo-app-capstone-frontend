"use client"



export default function Layout({ children } : { children: React.ReactNode }) {


    return (
      <div className="flex min-h-screen ">
     
        <main className="w-full">
          <div className="mb-[80px] md:mb-[0px]"> </div>
          {children}
        </main>
      </div>
    );
  }