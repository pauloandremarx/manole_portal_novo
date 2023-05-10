 
'use client'

import "uikit/dist/css/uikit.min.css";
import './globals.css'
import NextTopLoader from 'nextjs-toploader';

  
import UIKit from '@/components/Uikit'
import Providers from "@/util/provider";

export const metadata = {
  title: 'Portal Manole',
  description: 'Generated by create next app',
}

export  default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
     
  return (
    <html lang="en">
      <body>
            <NextTopLoader color="#E65B20"
          initialPosition={0.08}
          crawlSpeed={200}
          height={23}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={10} />
        <Providers> <UIKit> {children} </UIKit> </Providers>
      </body>
    </html>
  )
}
