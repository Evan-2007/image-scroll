import Link from 'next/link'

export default function Header(){
    return (
        <div className="mb-12 w-full flex justify-center mt-10 flex-col text-center items-center">
            <h1 className="text-6xl font-bold">Title</h1>
            <div className="w-4/6 h-[1px] bg-black mt-6"></div>
            <div className='mt-4'>
                <Link href="/" className="text-2xl font-bold">Home</Link>
                <Link href="/images" className="text-2xl font-bold ml-12">Images2</Link>
                <Link href="/about" className="text-2xl font-bold ml-12">About</Link>
                <Link href="/contact" className="text-2xl font-bold ml-12">Contact</Link>
            </div>
        </div>
    )
}