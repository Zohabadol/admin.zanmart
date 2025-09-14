export const SkeletonTable = () => {
    return <div>
        <tr className='w-full flex gap-10 my-5'>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
        </tr>

        <tr className='w-full flex gap-10 my-5 py-0'>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60 py-0'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
        </tr>

        <tr className='w-full flex gap-10 my-5'>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
        </tr>

        <tr className='w-full flex gap-10 my-5 py-0'>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60 py-0'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
        </tr>

        <tr className='w-full flex gap-10 my-5'>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
            <td className='animate-pulse rounded-full bg-slate-200 h-2 w-60'></td>
        </tr>

    </div>
}


export const SkeletonPage = () => {
    return <>
        <div className="flex flex-col gap-4 ">
            <div className="skeleton h-64 w-full bg-slate-100"></div>
            <div className="skeleton h-4 w-96 bg-slate-100"></div>
            <div className="skeleton h-4 w-full bg-slate-100 "></div>
            <div className="skeleton h-4 w-full bg-slate-100"></div>
            <div className="skeleton h-4 w-full bg-slate-100 "></div>
            <div className="skeleton h-4 w-full bg-slate-100"></div>
            <div className="skeleton h-4 w-full bg-slate-100 "></div>
            <div className="skeleton h-4 w-full bg-slate-100"></div>
        </div>
    </>
}

export const SkeletonForm = () => {
    return <>
        <section className="my-5">
            <div className="h-5 bg-slate-200 rounded col-span-1 w-96"></div>
            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className='text-center'>
                <button className="h-7 bg-slate-200 w-32 rounded col-span-1"></button>
            </div>
        </section>
    </>
}