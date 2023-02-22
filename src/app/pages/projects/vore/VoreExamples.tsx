import React from "react"
import { Anchor, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"

interface VoreExamplesProperties {
  onSelect: (source: any, searchText: any) => any,
  className?: string,
}

interface VoreExample {
  title: string,
  description: string,
  source: string,
  searchText: string,
}

const ExampleList: VoreExample[] = [
  {
    title: "Hello, World!",
    description: "Finds all the 'Hello, World!'s in the search text.",
    source: "find all 'Hello, World!'",
    searchText: `A "Hello, World!" program is generally a computer program that ignores any input and outputs or displays a message similar to "Hello, World!". A small piece of code in most general-purpose programming languages, this program is used to illustrate a language's basic syntax. "Hello, World!" programs are often the first a student learns to write in a given language,[1] and they can also be used as a sanity check to ensure computer software intended to compile or run source code is correctly installed, and that its operator understands how to use it.`
  },
  {
    title: "FizzBuzz",
    description: "Matches any number in the search text and runs FizzBuzz on it",
    source: `set FizzBuzz to transform
    if match % 15 == 0 then
        return 'FizzBuzz'
    end 
    if match % 5 == 0 then
        return 'Buzz'
    end 
    if match % 3 == 0 then
        return 'Fizz'
    end
    return match
end

replace all at least 1 digit with FizzBuzz`,
    searchText: `1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50`
  }
] 

export const VoreExamples = ({onSelect, className}: VoreExamplesProperties) => {
  const handleSelected = React.useCallback((event: any) => {
    const value = ExampleList.find(x => x.title === event.target.innerText);
    onSelect(value?.source, value?.searchText);
  }, [onSelect]);

  return (<DropdownButton className={className} as={ButtonGroup} title="Examples">
    {ExampleList.map((value, index) => (
      <Dropdown.Item as={Anchor} eventKey={index} onClick={handleSelected}>
        <span>{value.title}</span>
      </Dropdown.Item>))}
  </DropdownButton>);
}

export default VoreExamples;