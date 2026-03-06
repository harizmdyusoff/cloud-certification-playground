import {
  Button,
  Label,
  makeStyles,
  tokens,
} from '@fluentui/react-components'

const useStyles = makeStyles({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    '& div': {
      flexGrow: 1,
    },
    '& div:nth-child(2)': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& div:nth-child(3)': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  paginationButton: {},
  activePageButton: {
    color: tokens.colorBrandBackground,
  },
})

export function Pagination({
  totalPages,
  page,
  setPage,
}: {
  page: number
  totalPages: number
  setPage: (page: number) => void
}) {
  const styles = useStyles()

  return (
    <div className={styles.paginationContainer}>
      <div>
        <Button
          size="large"
          shape="square"
          className={styles.paginationButton}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
      </div>
      <div>
        <Label>{`Page ${page} of ${totalPages}`}</Label>
      </div>
      <div>
        <Button
          size="large"
          shape="square"
          className={styles.paginationButton}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
