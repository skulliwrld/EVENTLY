import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <section className='w-full'>
      <div className=" flex flex-col md:flex-row flex-center flex-between wrapper">
        <Link href="/">
          <Image src="/assets/icons/cover.png" alt="logo" width={128} height={40} />
        </Link>

        <p>2023 Skulli Events. All Right Reserved.</p>
      </div>
    </section>
  )
}

export default Footer