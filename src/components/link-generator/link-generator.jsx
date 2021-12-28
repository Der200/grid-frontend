import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const LinkGenerator = (props) => {
  const [subs, setSubs] = useState({});

  const setLinkValue = (e) => {
    setSubs({
      ...subs,
      [e.target.name]: e.target.value
    })
  }

  const linkConcatenator = () => {
    let generatedLink = ''
    for (var key in subs) {
      generatedLink += '&' + key + '=' + subs[key]
    }
    generatedLink = props.link + generatedLink.slice(1)
    navigator.clipboard.writeText(generatedLink)
    return
  }

  return (
    <section style={{marginTop: "20px"}}>
      <Typography variant="h6" component="h6">
        Генератор уникальных ссылок
      </Typography>
      <TextField disabled label="Базовая ссылка предложения" variant="filled" size="small" value={(props.link) || ''} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub1" variant="outlined" size="small" name="sub1" value={subs.sub1 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub2" variant="outlined" size="small" name="sub2" value={subs.sub2 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub3" variant="outlined" size="small" name="sub3" value={subs.sub3 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub4" variant="outlined" size="small" name="sub4" value={subs.sub4 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub5" variant="outlined" size="small" name="sub5" value={subs.sub5 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <TextField id="outlined-basic" label="Sub6" variant="outlined" size="small" name="sub6" value={subs.sub6 || ''} onChange={setLinkValue} sx={{width: "100%", marginBottom: 1}} />
      <Button
        variant="contained"
        loading
        size="large"
        onClick={linkConcatenator}
        sx={{
          width: "100%",
          borderRadius: 0
        }}>Скопировать уникальную ссылку</Button>
    </section>
  )
}

export default LinkGenerator;