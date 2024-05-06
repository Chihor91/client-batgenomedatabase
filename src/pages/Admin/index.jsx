import Accounts from "./Accounts";
import Logs from "./Logs";

export default function AdminPage() {
    return (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-4xl font-bold'>Admin</h1>
			{/* <h1 className="text-[32px] font-medium">
                Coming soon :)
            </h1> */}
            <div className="flex space-x-10">
				<Accounts />
				<Logs />
			</div>
		</div>
	)
}