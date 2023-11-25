import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import axios from "axios"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import IsolateTable from "@/pages/Isolate/IsolateTable"
import { columns }  from "@/pages/Isolate/columns"

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
                    <li className="flex"><div className={label}>Collection:</div>{data.collection}</li>
                    <li className="flex"><div className={label}>Institution:</div>{data.institution}</li>
                    <li className="flex"><div className={label}>Project:</div>{data.project_name}</li>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function HostInfo ({data}) {

    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1" />Host Information</CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <ul className={listStyle}>
                    <li className="flex"><div className={label}>Host Type:</div>{data.host_type==="" ? "N/A" : data.host_type}</li>
                    <li className="flex"><div className={label}>Host Species:</div>{data.host_species==="" ? "N/A" : data.host_species}</li>
                    <li className="flex"><div className={label}>Sample Type:</div>{data.sample_type}</li>
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
                    <li className="flex"><div className={label}>Location:</div>{location ? location.town + ", " + location.province : "N/A"}</li>
                    <li className="flex"><div className={label}>Cave:</div>{cave ? cave.name + " (" + cave.abbr + ")" : "N/A"}</li>
                    <li className="flex"><div className={label}>Sampling Point:</div>{samplingPoint ? samplingPoint.point_number : "N/A"}</li>
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function Strains ({data}) {
    const [strains, setStrains] = useState([])
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/strain/?source=" + data.id)
        .then((res) => {
            setStrains(res.data)
        })
    }, [])

    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1"  />Strains</CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <IsolateTable data={strains} columns={columns}/>
            </CollapsibleContent>
        </Collapsible>
    )
}

export { BasicInfo, HostInfo, SamplingInfo, Strains }