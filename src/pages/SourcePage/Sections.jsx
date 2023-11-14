import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import axios from "axios"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

const collapsibleStyle = "border mx-5 text-start"
const colTriggerStyle = "flex border w-full text-start text-2xl font-extrabold p-2"
const colContentStyle = "m-3"
const listStyle = "space-y-1"

function BasicInfo ({data}) {
    return (
        <Collapsible className={collapsibleStyle}>
            <CollapsibleTrigger className={colTriggerStyle}><ChevronDown strokeWidth={5} className="m-1" /><div>Basic Information</div></CollapsibleTrigger>
            <CollapsibleContent className={colContentStyle}>
                <ul className={listStyle}>
                    <li>Collection: {data.collection}</li>
                    <li>Institution: {data.institution}</li>
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
                    <li>Host Type: {data.host_type==="" ? "N/A" : data.host_type}</li>
                    <li>Host Species: {data.host_species==="" ? "N/A" : data.host_species}</li>
                    <li>Sample Type: {data.sample_type}</li>
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

export { BasicInfo, HostInfo, SamplingInfo }