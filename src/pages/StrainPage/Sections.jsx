import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import axios from "axios"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import IsolateTable from "@/pages/Strain/StrainTable"
import { columns }  from "@/pages/Strain/columns"

const collapsibleStyle = "border mx-5 text-start"
const colTriggerStyle = "flex border bg-muted w-full text-start text-2xl font-extrabold p-2"
const colContentStyle = "m-3"
const listStyle = "space-y-1"
const label = "font-bold mr-1"

function BasicInfo ({data}) {
    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1" /><div>Basic Information</div></CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <ul className={listStyle}>
                    <li className="flex"><div className={label}>Accession Number:</div> {data.accession_no}</li>
                    <li className="flex"><div className={label}>Type:</div> 
                        {data.type === 1 && " Bacteria"} 
                        {data.type === 2 && " Yeast"}
                        {data.type === 3 && " Mold"}
                    </li>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function HostInfo ({data}) {
    const [host, setHost] = useState(null)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/source/" + data.source)
        .then((res) => {
            setHost(res.data)
        })
    }, [])

    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1" />Source Information</CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <ul className={listStyle}>
                    <li className="flex"><div className={label}>Source ID:</div>{host ? host.human_readable_id : "N/A"}</li>
                    <li className="flex"><div className={label}>Source Type:</div>{host ? host.host_type : "N/A"}</li>
                    <li className="flex"><div className={label}>Source Species:</div>{host ? host.host_species : "N/A"}</li>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function SamplingInfo ({data}) {
    const [samplingPoint, setSamplingPoint] = useState(null)
    const [cave, setCave] = useState(null)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/location/point/" + data.sampling_point)
        .then((res) => {
            setSamplingPoint(res.data)
            axios.get(axios.defaults.baseURL + "/location/cave/" + res.data.cave)
            .then((res) => {
                setCave(res.data)
                axios.get(axios.defaults.baseURL + "/location/location/" + res.data.location)
                .then((res) => {
                    setLocation(res.data)
                })
            })
        })
    }, [])

    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1"  />Sampling Information</CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <ul className={listStyle}>
                    <li>Location: {location ? location.town + ", " + location.province : "N/A"}</li>
                    <li>Cave: {cave ? cave.name + " (" + cave.abbr + ")" : "N/A"}</li>
                    <li>Sampling Point: {samplingPoint ? samplingPoint.point_number : "N/A"}</li>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function Isolates ({data}) {
    const [isolates, setIsolates] = useState([])
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/isolate/?source=" + data.id)
        .then((res) => {
            setIsolates(res.data)
        })
    }, [])

    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1"  />Isolates</CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <IsolateTable data={isolates} columns={columns}/>
            </CollapsibleContent>
        </Collapsible>
    )
}

export { BasicInfo, HostInfo, SamplingInfo, Isolates }