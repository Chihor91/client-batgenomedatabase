import { Input, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AddAccount (open, handleClose) {
    const form = useForm({})

    const { register, handleSubmit } = form
    const onSubmit = (data) => {
		axios.post('user/account/', data).then((res) => {
			alert("Account successfully created.")
			handleClose()
		})
	}

    return (
        <Dialog
            fullWidth={true}
            PaperProps={{
                style: { backgroundColor: '#007E10 ', borderRadius: '20px', borderWidth: '5px' },
            }}
            maxWidth='md'
            open={open}
            onClose={handleClose}>
            <DialogTitle style={{ fontWeight: '800', fontSize: '1.5rem', color: 'white' }}>
				Add New Account
			</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className='m-5 flex flex-col space-y-3 w-auto text-primary'>
				<Input {...register('username')} type='text' placeholder='Userame' />
				<Input {...register('email')} type='text' placeholder='Email Address' />
				<Input {...register('password')} type='password' placeholder='Password' />
				<Input {...register('password2')} type='password' placeholder='Repeat Password' />
                <DialogActions>
					<Button type='button' variant='outline' onClick={handleClose}>
						Cancel
					</Button>
					<Button type='submit' variant='outline'>
						Add
					</Button>
				</DialogActions>
			</form>
        </Dialog>
    )
}

export default function Accounts () {
    const [accounts, setAccounts] = useState([])
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        axios.get('/user/accounts/')
        .then((res) => {
            setAccounts(res.data)
        })
    }, [open])

    return (
        <Paper className="p-3 space-y-2" elevation={6}>
            {AddAccount(open, () => {setOpen(false)})}
            <h1 className="text-center w-full font-semibold">Accounts</h1>
            <TableContainer sx={{ maxHeight: 330 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell><div>Username</div></TableCell>
                            <TableCell><div>Email</div></TableCell>
                            <TableCell><div></div></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell><Button variant='outline'>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outline' onClick={() => setOpen(true)}>Add Account</Button>
        </Paper>
    )
}