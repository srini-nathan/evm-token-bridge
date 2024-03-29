import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import useWeb3Connect from './hooks/useWeb3Connect'
import useWeb3Contracts from './hooks/useWeb3Contracts'
import NetworkInfo from "./components/NetworkInfo"
import Bridge from "./components/Bridge"
import reducer, { initialState } from './reducer'
import { useReducer } from 'react'

export const Home = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [
    { connect, disconnect }, 
    { chainDataFrom, chainDataTo, web3ProviderFrom, address, supportedChains }
  ] = useWeb3Connect(state, dispatch)
  const [from, to] = useWeb3Contracts(state)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{ color: '#017abd' }} variant="h6" component="div" >
              xFW7&nbsp;
              </Typography>
              <Typography variant="h6" component="div">
              Bridge
              </Typography>
            </Box>
            <NetworkInfo chainData={chainDataFrom} address={address}/>
            {web3ProviderFrom ? (
                <Button color="inherit" onClick={disconnect}>Disconnect</Button>
            ) : (
              <Button color="inherit" onClick={connect}>Connect</Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {web3ProviderFrom && (
        <Container fixed sx={{ height: '80vh' }}>
          <Grid container sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={4}>
              <Bridge 
                address={address} 
                chainData={{ from: chainDataFrom, to: chainDataTo }} 
                contracts={{ from, to }}
                supportedChains={supportedChains}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Home