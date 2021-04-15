import fs from 'fs'
import util from 'util'
import textToSpeech from '@google-cloud/text-to-speech'

const client = new textToSpeech.TextToSpeechClient();

export const tts = async text => {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' }
  }

  const outputRoot = 'public/sounds/'
  const outputFile = `${text}.mp3`
  const outputPath = `${outputRoot}/${outputFile}`

  if (!fs.existsSync(outputPath)) {
    const [responce] = await client.synthesizeSpeech(request)
    const writeFile = util.promisify(fs.writeFile)
    await writeFile(outputPath, responce.audioContent, 'binary')
    
    console.log(`Audio content written to file: ${outputFile}`)
  }

  return outputFile
}
