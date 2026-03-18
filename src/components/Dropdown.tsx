import {
  Label,
  Dropdown,
  Option,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components'

const useStyles = makeStyles({
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownInput: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: 0,
    width: 'calc(50% - 10px)',
    '&:hover': {
      borderBottomColor: tokens.colorBrandBackgroundHover,
    },
    '&:focus-within': {
      borderBottomColor: tokens.colorBrandBackgroundHover,
    },
  },
  dropdownOption: {
    borderRadius: 0,
  },
})

export function CustomDropdown(data: string[], selectedData: string, setSelectedData: (provider: string) => void, dropdownLabel: string) {
  const styles = useStyles()
  const dropdownId = useId('')

  return (
    <div className={styles.dropdownContainer}>
      <Label htmlFor={dropdownId}>{dropdownLabel}</Label>
      <Dropdown
        size="large"
        className={styles.dropdownInput}
        id={dropdownId}
        placeholder="Select a cloud provider"
        onOptionSelect={(option: any) => {
          setSelectedData(option.target.textContent)
        }}
        value={selectedData}
      >
        {data.map((item) => (
          <Option className={styles.dropdownOption} key={item}>{item}</Option>
        ))}
      </Dropdown>
    </div>
  )
}
