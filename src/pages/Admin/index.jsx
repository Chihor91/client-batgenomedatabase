import Accounts from "./Accounts";

export default function AdminPage() {
    return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-[100px] font-medium'>Admin</h1>
			{/* <h1 className="text-[32px] font-medium">
                Coming soon :)
            </h1> */}
            <Accounts />
		</div>
	)
}