import {Box,Divider,Title} from "@mantine/core"

function Card({title,children}: {title: string,children: React.ReactElement}) {
  return (
    <Box sx={{minWidth: "15rem"}}>
        <Title order={2} sx={{padding: "2rem"}}>{title}</Title>
        <Divider/>
        <Box sx={{padding: "2rem"}}>
            {children}
        </Box>
    </Box>
  )
}

export default Card