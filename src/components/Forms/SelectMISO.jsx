import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { category_1, category_2, category_3 } from "@/constants/miso";
import { useState } from "react";

function ComboboxPopover({ data, title, handleCategoryChange, selectedValue, setSelectedValue }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="items-center space-x-4 w-full">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button 
						variant="outline"
						size="sm"
						className="justify-start w-[100%]"
					>
						{selectedValue ? selectedValue : title}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='p-0' align='start'>
					<Command>
						<CommandInput placeholder="Set a category..." />
						<CommandList>
							<CommandEmpty value={''}>No results found.</CommandEmpty>
							<CommandGroup>
								{data.map(item => (
									<CommandItem
										key={'miso' + item.name + item.id}
										value={item.name}
										onSelect={name => {
											setSelectedValue(name)
											setOpen(false)
											handleCategoryChange(item)
										}}
										className={item.color_code}
									>
										<span className="text-background">{item.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default function SelectMISO({handleMISOChange}) {
	const [category1, setCategory1] = useState('')
	const [category2, setCategory2] = useState('')
	const [category3, setCategory3] = useState('')
	const [category2Options, setCategory2Options] = useState(category_2)
	const [category3Options, setCategory3Options] = useState(category_3)
	
	const handleCategory1Change = (category) => {
		setCategory1(category.name)
		setCategory2('')
		setCategory3('')
		setCategory2Options(category_2.filter((item) => { return item.cat1_code === category.cat1_code }))
		setCategory3Options(category_3.filter((item) => { return item.cat1_code === category.cat1_code }))
	}
	
	const handleCategory2Change = (category) => {
		setCategory2(category.name)
		setCategory3('')
		setCategory3Options(category_3.filter((item) => { return item.cat2_code === category.cat2_code }))
	}
	
	const handleCategory3Change = (category) => {
		setCategory3(category.name)
	}

	return (
		<div className="grid grid-cols-10 lg:space-x-2 lg:space-y-0 space-y-2 mt-2">
			<div className="lg:col-span-3 col-span-full">
				<ComboboxPopover data={category_1} title={'Category 1'} handleCategoryChange={handleCategory1Change} selectedValue={category1} setSelectedValue={setCategory1} />
			</div>
			<div className="lg:col-span-3 col-span-full">
				<ComboboxPopover data={category2Options} title={'Category 2'} handleCategoryChange={handleCategory2Change} selectedValue={category2} setSelectedValue={setCategory2} />
			</div>
			<div className="lg:col-span-3 col-span-full">
				<ComboboxPopover data={category3Options} title={'Category 3'} handleCategoryChange={handleCategory3Change} selectedValue={category3} setSelectedValue={setCategory3} />
			</div>
			<Button
				type='button'
				variant='ghost'
				className='underline mr-1 col-span-full lg:col-span-1'
				disabled={category1 == '' && category2 == '' && category3 == ''}
				onClick={ () => {
					handleMISOChange([category1, category2, category3])
					setCategory1('')
					setCategory2('')
					setCategory3('')
					setCategory2Options(category_2)
					setCategory3Options(category_3)
					console.log('a')
				}}
			>
				Add/Save
			</Button>
		</div>
	)

}