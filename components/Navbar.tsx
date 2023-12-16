import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full h-[60px] m-0 p-2 backdrop:blur-xl bg-slate-100 border-b border-slate-300 bg-[rgba(255,255,255,0.25)] fixed top-0 right-0 z-50">
        <nav className="flex justify-between items-center">
            <Link href={'/'} className="text-xl select-none cursor-pointer text-slate-900 font-sans font-bold ml-5 p-1"><span className="text-red-500">Red</span>Shield</Link>
            <ul className="text-slate-800 flex gap-4 mr-6 justify-center items-center">
                <li>
                    <Link href={'/'}>About</Link>
                </li>
                <li>
                    <Link href={'/'}>Docs</Link>
                </li>
                <li>
                    <Link href={'/'}>Contact</Link>
                </li>
                
            </ul>
        </nav>
    </div>
  )
}

export default Navbar