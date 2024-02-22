import { Dialog, DialogTitle, DialogActions, Input, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

function LocationFormModal({open, handleClose}) {
    const form = useForm({})

    const { register, watch, handleSubmit } = form

    const onSubmit = (data) => {
        axios.post("/location/location/", data)
        .then((res) => {
            handleClose()
        })
    }

    return (
        <Dialog fullWidth={true} PaperProps={{style: { borderRadius: "20px", borderWidth: "5px"}}} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle style={{fontWeight: "800", fontSize: "1.5rem"}}>Add New Location</DialogTitle>
            <div className="flex flex-col m-5 space-y-3 w-auto text-primary">
                <Input {...register("abbr")} type="text" placeholder="Location Abbreviation" />
                <Input {...register("province")} type="text"  placeholder="Province" />
                <Input {...register("town")} type="text"  placeholder="Town" />
                <Input {...register("long")} type="text"  placeholder="Longitude" />
                <Input {...register("lat")} type="text" placeholder="Latitude" />
                <DialogActions>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={() => onSubmit(watch(form))} variant="outline">Add</Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

function CaveFormModal({open, handleClose, locID}) {
    const form = useForm({})

    const { register, watch, handleSubmit } = form

    const onSubmit = (data) => {
        data["location"] = locID
        axios.post("/location/cave/", data)
        .then((res) => {
            handleClose()
        })
    }

    return (
        <Dialog fullWidth={true} PaperProps={{style: { borderRadius: "20px", borderWidth: "5px"}}} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle style={{fontWeight: "800", fontSize: "1.5rem"}}>Add New Cave</DialogTitle>
            <div className="flex flex-col m-5 space-y-3 w-auto text-primary">   
                <Input {...register("name")} type="text"  placeholder="Cave Name" />
                <Input {...register("abbr")} type="text" placeholder="Cave Abbreviation" />
                <DialogActions>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={() => onSubmit(watch(form))} variant="outline">Add</Button>
                </DialogActions>
                {locID}
            </div>
        </Dialog>
    )
}

function PointFormModal({open, handleClose, caveID}) {
    const onSubmit = () => {
        let data = {"cave": caveID}
        axios.post("/location/point/", data)
        .then((res) => {
            handleClose()
        })
    }

    return (
        <Dialog fullWidth={true} PaperProps={{style: { borderRadius: "20px", borderWidth: "5px"}}} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle style={{fontWeight: "800", fontSize: "1.5rem"}}>Add New Project</DialogTitle>
            <div className="flex flex-col m-5 space-y-3 w-auto text-primary">
                <div>
                    Would you like to add a new sampling point?
                </div>
                <DialogActions>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={() => onSubmit()} variant="outline">Confirm</Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export {LocationFormModal, CaveFormModal, PointFormModal}