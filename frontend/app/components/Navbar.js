import Link from "next/link";
const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-bold">
                P15
            </h1>

            <div className="flex gap-6">
                <Link href="/">Home</Link>
                <Link href="/student">Student</Link>
                <Link href="/employer">Employer</Link>
                <Link href="/supervisor">Supervisor</Link>
                <Link href="/faculty">Faculty</Link>
                <Link href="/coordinator">Coordinator</Link>
                <Link href="/admin">Admin</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar