import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface IOption {
  label: string;
  value: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
}

interface IProps {
  selected: string;
  onChange(value: string): void;
  options: IOption[];
}

const Select: React.FC<IProps> = ({ selected, onChange, options }) => {
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null
  );

  React.useEffect(() => {
    if (selected) {
      const findOption = options.find(
        (option: IOption) => option.value === selected
      );
      if (findOption) setSelectedOption(findOption);
    }
  }, [selected, options]);

  return (
    <Listbox value={selected} onChange={(value: string) => onChange(value)}>
      <div className="relative">
        <Listbox.Button
          className={`"relative w-full cursor-default rounded-lg bg-white h-8 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
            selectedOption
              ? `${selectedOption.color} ${selectedOption.bgColor}`
              : ""
          }`}
        >
          {selectedOption ? (
            <span className="block truncate">
              <div className="flex flex-row items-center">
                {selectedOption.icon}
                <span className="inline-block ml-2">
                  {selectedOption.label}
                </span>
              </div>
            </span>
          ) : null}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option: IOption, optionIdx: number) => {
              if (option.value === selected) return null;
              return (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <div className="flex flex-row items-center">
                      {option.icon}
                      <span
                        className={`block truncate ml-2 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
