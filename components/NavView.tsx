import Link from "next/link"
import { usePathname } from "next/navigation"

function NavView(props:
    { title: string, links: string , icons:any}
  )  {
    const pathName = usePathname()
  return (
    <section className="flex justify-between items-center ">
        <div className={pathName == props.links?"flex justify-between gap-2 items-center bg-slate-600 text-white py-3 px-2 rounded-md hover:bg-purple-700 hover:text-white" : `flex justify-between gap-2 items-center hover:bg-purple-700 hover:text-white py-3 rounded-md px-2`}>
            <i>{props.icons}</i>
           <Link href={props.links}>{props.title}</Link>  
        </div>
        
    </section>
  )
}

export default NavView