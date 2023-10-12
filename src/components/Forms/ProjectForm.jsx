import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


function ProjectFormModal({open, handleClose}) {
    const form = useForm({})

    const { register, handleSubmit } = form

    const onSubmit = (data) => {

        axios.post("source/project/", data)
        .then((res) => {
            console.log(res.data)
            handleClose()
        })
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Add New Project</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="m-10 space-y-3 w-auto text-gray-100">
                <Input {...register("name")} type="text" placeholder="Project Name" />
                <Input {...register("abbr")} type="text"  placeholder="Project Abbr." />
                <DialogActions>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="outline">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

function ProjectForm() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>Add New Project</Button>
            <ProjectFormModal open={open} handleClose={() => setOpen(false)} />
        </>
    )
}

export {ProjectForm, ProjectFormModal}