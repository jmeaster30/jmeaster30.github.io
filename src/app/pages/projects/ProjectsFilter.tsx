import { observer } from 'mobx-react';
import * as React from 'react';
import Multiselect from 'multiselect-react-dropdown';
import styles from "app/styles/shared/ProjectEntryStyle.scss";
import ProjectTag from './ProjectTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface ProjectsFilterProps {
  options: string[],
  onFilterUpdate?: (selectedTags: string[]) => void,
}

interface ProjectsFilterOptions {
  name: string,
  id: number,
}

const ProjectsFilter = observer(({ options, onFilterUpdate }: ProjectsFilterProps) => {
  const [internalOptions, setInternalOptions] = React.useState<ProjectsFilterOptions[]>([]);
  const [selected, setSelected] = React.useState<ProjectsFilterOptions[]>([]);

  React.useEffect(() => {
    setInternalOptions(options
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((value, index) => ({name: value, id: index})));
  }, [options]);

  React.useEffect(() => {
    if (onFilterUpdate) {
      onFilterUpdate(selected.map(value => value.name));
    }
  }, [selected]);

  const handleSelected = React.useCallback((_: any, selectedValue: ProjectsFilterOptions) => {
    const arr = [...selected];
    arr.push(selectedValue);
    arr.filter((value, index, self) => self.indexOf(value) === index)
    setSelected(arr);
  }, [selected, internalOptions, setSelected]);

  const handleRemove = React.useCallback((_: any, removedValue: ProjectsFilterOptions) => {
    const arr = [...selected];
    arr.splice(arr.indexOf(removedValue), 1);
    arr.filter((value, index, self) => self.indexOf(value) === index)
    setSelected(arr);
  }, [selected, internalOptions, setSelected]);

  return <Multiselect className={styles.projectEntryFilter} placeholder={"Filter by Tags"} hidePlaceholder customCloseIcon={<FontAwesomeIcon className="customCloseIcon" icon={faCircleXmark}/>}
    options={internalOptions} selectedValues={selected} onSelect={handleSelected} onRemove={handleRemove} displayValue="name"
    selectedValueDecorator={(value) => <ProjectTag text={value}/>} />
});

export default ProjectsFilter;
