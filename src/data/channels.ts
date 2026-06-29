import { Channel, Program } from '../types';

export const INITIAL_CHANNELS: Channel[] = [
  // --- GERAL (Canais de TV Aberta) ---
  {
    id: 'tv-globo',
    name: 'TV Globo SP',
    logo: 'GLOBO',
    logoBg: 'bg-blue-600',
    category: 'Geral',
    streamUrl: 'https://cdn-5.nxplay.com.br/GLOBO_SP_TK/index.m3u8',
    type: 'hls',
    backupUrl: 'http://187.62.68.32:8080/GLOBO/index.m3u8',
    backupType: 'hls',
    description: 'A maior emissora do país, trazendo jornalismo local, novelas de sucesso, futebol ao vivo e entretenimento para todo o Brasil.',
    currentShow: 'Jornal Nacional',
    nextShow: 'Novela das Nove'
  },
  {
    id: 'tv-brasil',
    name: 'TV Brasil',
    logo: 'TVB',
    logoBg: 'bg-emerald-600',
    category: 'Geral',
    streamUrl: 'https://tvbrasil-stream.ebc.com.br/index.m3u8',
    type: 'hls',
    backupUrl: 'https://lbgo.bozztv.com/ssh101/ssh101/unitvms/playlist.m3u8',
    backupType: 'hls',
    description: 'Emissora pública brasileira, com programação de entretenimento, jornalismo, esportes, desenhos educativos e cidadania.',
    currentShow: 'Repórter Brasil',
    nextShow: 'Sem Censura'
  },
  {
    id: 'tv-cultura',
    name: 'TV Cultura',
    logo: 'CULT',
    logoBg: 'bg-green-700',
    category: 'Geral',
    streamUrl: 'https://player-tvcultura.stream.uol.com.br/live/tvcultura.m3u8',
    type: 'hls',
    backupUrl: 'https://cdn-5.nxplay.com.br/TV_CULTURA/index.m3u8',
    backupType: 'hls',
    description: 'Emissora pública reconhecida internacionalmente por sua programação de alto nível educacional, infantil, cultural e de debates.',
    currentShow: 'Jornal da Cultura',
    nextShow: 'Roda Viva'
  },
  {
    id: 'sbt-interior',
    name: 'SBT Interior',
    logo: 'SBT',
    logoBg: 'bg-purple-600',
    category: 'Geral',
    streamUrl: 'https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8',
    type: 'hls',
    backupUrl: 'https://video09.logicahost.com.br/sbtcuiaba/sbtcuiaba/playlist.m3u8',
    backupType: 'hls',
    description: 'Programação oficial do SBT com auditório, programas populares de humor, novelas infantis e jornalismo comunitário local.',
    currentShow: 'Programa Silvio Santos',
    nextShow: 'The Noite com Danilo Gentili'
  },
  {
    id: 'rede-brasil',
    name: 'Rede Brasil de Televisão',
    logo: 'RBTV',
    logoBg: 'bg-cyan-700',
    category: 'Geral',
    streamUrl: 'https://redebrasil.nuvemplay.live/hls/stream.m3u8',
    type: 'hls',
    description: 'Canal focado em séries e desenhos retrô clássicos que marcaram época, além de variedades e jornalismo independente.',
    currentShow: 'Sessão Nostalgia',
    nextShow: 'Séries de Ouro'
  },
  {
    id: 'record-tv-sp',
    name: 'Record TV São Paulo',
    logo: 'REC',
    logoBg: 'bg-red-600',
    category: 'Geral',
    streamUrl: 'https://playplusspo-lh.akamaihd.net/i/pp_sp@350176/index_720_av-p.m3u8',
    type: 'hls',
    backupUrl: 'https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8',
    backupType: 'hls',
    description: 'Transmissão ao vivo de São Paulo com telejornais policiais, programas de variedades, reality shows e jornalismo investigativo.',
    currentShow: 'Balanço Geral',
    nextShow: 'Cidade Alerta'
  },

  // --- NOTÍCIAS ---
  {
    id: 'record-news',
    name: 'Record News',
    logo: 'RN',
    logoBg: 'bg-red-700',
    category: 'Notícias',
    streamUrl: 'https://playplusnews-lh.akamaihd.net/i/pp_nws@377849/master.m3u8',
    type: 'hls',
    backupUrl: 'https://rnw-rn.otteravision.com/rnw/rn/rnw_rn.m3u8',
    backupType: 'hls',
    description: 'Canal de jornalismo 24 horas da Record, cobrindo as principais notícias do Brasil e do mundo.',
    currentShow: 'Hora News',
    nextShow: 'Record News Paulista'
  },
  {
    id: 'bandnews',
    name: 'BandNews',
    logo: 'BNN',
    logoBg: 'bg-blue-800',
    category: 'Notícias',
    streamUrl: 'https://cdn-5.nxplay.com.br/BAND_NEWS/index.m3u8',
    type: 'hls',
    backupUrl: 'http://143.14.178.40:7777/Band_News_HD/index.m3u8',
    backupType: 'hls',
    description: 'Giro completo de notícias de 15 em 15 minutos, cobrindo política, economia, trânsito e esportes em tempo real.',
    currentShow: 'Jornal BandNews',
    nextShow: 'Madrugada BandNews'
  },
  {
    id: 'jovem-pan-news',
    name: 'Jovem Pan News',
    logo: 'JPN',
    logoBg: 'bg-blue-900',
    category: 'Notícias',
    streamUrl: 'https://d6yfbj4xxtrod.cloudfront.net/out/v1/7836eb391ec24452b149f3dc6df15bbd/index.m3u8',
    type: 'hls',
    description: 'Canal de debates dinâmicos, rádio-jornalismo ao vivo e opinião política contundente sobre as pautas diárias do Brasil.',
    currentShow: 'Os Pingos nos Is',
    nextShow: 'Jornal da Manhã'
  },
  {
    id: 'globonews',
    name: 'GloboNews',
    logo: 'GNews',
    logoBg: 'bg-red-900',
    category: 'Notícias',
    streamUrl: 'http://143.14.178.40:7777/GloboNews_HD/index.m3u8',
    type: 'hls',
    backupUrl: 'http://41.205.70.146/GLOBONEWS/index.m3u8',
    backupType: 'hls',
    description: 'Cobertura dos fatos que mudam o país e o mundo com análises em estúdio, grandes debates de política e notícias em cima do lance.',
    currentShow: 'Estúdio i',
    nextShow: 'Edição das 18h'
  },
  {
    id: 'times-brasil',
    name: 'Times Brasil CNBC',
    logo: 'CNBC',
    logoBg: 'bg-slate-800',
    category: 'Notícias',
    streamUrl: 'https://ssai2-ads.api.leiniao.com/global-adinsertion-api/hls/live/v2/21fdb6dd7491406bba86497a24390a25/playlist.m3u8',
    type: 'hls',
    description: 'O canal do principal ecossistema de jornalismo de negócios internacional e finanças do Brasil.',
    currentShow: 'CNBC Debate',
    nextShow: 'Money Times'
  },

  // --- FILMES & SÉRIES ---
  {
    id: 'pluto-tv-cine',
    name: 'Pluto TV Cine Sucessos',
    logo: 'CINE',
    logoBg: 'bg-amber-600',
    category: 'Filmes & Séries',
    streamUrl: 'https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/v2/stitch/hls/channel/5f120e94a5714d00074576a1/master.m3u8?advertisingId=&appName=web&appVersion=8.1.0&app_name=web&clientDeviceType=0&clientID=e90092d6-73aa-11f1-9b62-00224833195a&clientModelNumber=1.0.0&country=BR&deviceDNT=false&deviceId=e90092d6-73aa-11f1-9b62-00224833195a&deviceLat=-22.9000&deviceLon=-43.3200&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=133.0.0&marketingRegion=BR&serverSideAds=false&sessionID=e90587f1-73aa-11f1-9d36-563000e8113a&sid=e90587f1-73aa-11f1-9d36-563000e8113a&userId=&jwt=eyJhbGciOiJIUzI1NiIsImtpZCI6IjY5NDBhYWZkLTNmY2UtNDZkNC05N2U4LTZkYWEzYjAwNDEzYiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSUQiOiJlOTA1ODdmMS03M2FhLTExZjEtOWQzNi01NjMwMDBlODExM2EiLCJjbGllbnRJUCI6IjE3Ny4xOTIuMjU1LjM4IiwiY2l0eSI6IlJpbyBEZSBKYW5laXJvIiwicG9zdGFsQ29kZSI6IjIwNzQwLTQ4MCIsImNvdW50cnkiOiJCUiIsImRtYSI6NzYwMDgsImFjdGl2ZVJlZ2lvbiI6IkJSIiwiZGV2aWNlTGF0IjotMjIuODk5OTk5NjE4NTMwMjczLCJkZXZpY2VMb24iOi00My4zMTk5OTk2OTQ4MjQyMiwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbiIsImRldmljZVR5cGUiOiJ3ZWIiLCJkZXZpY2VWZXJzaW9uIjoiMTMzLjAuMCIsImRldmljZU1ha2UiOiJjaHJvbWUiLCJkZXZpY2VNb2RlbCI6IndlYiIsImFwcE5hbWUiOiJ3ZWIiLCJhcHBWZXJzaW9uIjoiOC4xLjAiLCJjbGllbnRJRCI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImNtQXVkaWVuY2VJRCI6IiIsImlzQ2xpZW50RE5UIjpmYWxzZSwidXNlcklEIjoiIiwibG9nTGV2ZWwiOiJERUZBVUxUIiwidGltZVpvbmUiOiJBbWVyaWNhL1Nhb19QYXVsbyIsInNlcnZlclNpZGVBZHMiOmZhbHNlLCJlMmVCZWFjb25zIjpmYWxzZSwiZmVhdHVyZXMiOnsibXVsdGlQb2RBZHMiOnsiY29ob3J0IjoiIiwiZW5hYmxlZCI6dHJ1ZX0sInN0aXRjaGVySGxzTmciOnsiZGVtdXhlZEF1ZGlvIjoiaml0In19LCJmbXNQYXJhbXMiOnsiZndWY0lEMiI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImZ3VmNJRDJDb3BwYSI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImN1c3RvbVBhcmFtcyI6eyJmbXNfbGl2ZXJhbXBfaWRsIjoiIiwiZm1zX2VtYWlsaGFzaCI6IiIsImZtc19zdWJzY3JpYmVyaWQiOiIiLCJmbXNfaWZhIjoiIiwiZm1zX2lkZnYiOiIiLCJmbXNfdXNlcmlkIjoiZTkwMDkyZDYtNzNhYS0xMWYxLTliNjItMDAyMjQ4MzMxOTVhIiwiZm1zX3ZjaWQydHlwZSI6InVzZXJpZCIsImZtc19yYW1wX2lkIjoiIiwiZm1zX2hoX3JhbXBfaWQiOiIiLCJmbXNfYmlkaWR0eXBlIjoiMTA0NiIsIl9md18zUF9VSUQiOiJJREw6QXNMSmZaWS1DN1o5azgwUWMyLTAybzdvbzkteVdzNHYxZlpCa2Z2QUZCOGQwbVBEV29nWF9TVXl6c2EwNU1IblF1T1FGd0JFd3ZVMmczU1VrZWxldG5qNkd1a09CaUVwcGl5WEh1am5rUV9pUWpLa0Qtdi0tSVNJanFpMXlLVzlRVkZsaVlFZDQtM1dXOFlROEtRWmQxYTRvYUZTelpZdFpIdjV2d295Y3RESkUtRTM1eFN2Mmdfel9sX0g1T0lhd1hodENxUHBGNk9Od1JPVlBSSDNnRWFnQ0dRdWtEdU5GTXRjNTROME5Zam90ZVFwM0ZIUTh6OW42b0hKQ1EzY2ZuRlB1a0M3dWliSHNZZmtUc1A0bFdPems0a0xSS2FlT0ZQclBLWHZWX2h6Z1NnNGtoX180Szc0Vl9MM1hQUTZ1NFJaMTY2M2ZLekw1ckVrUDRXY1BvMGN6S0hNTkdlMmZvbjg4Y0FFWXciLCJmbXNfcnVsZWlkIjoiMTAwMTYsMTAwMjAsMTAwMDksMTAwMTMsMTAwMTUsMTAwMjEsMTAwMjMsMTAwMDAsMTAwMTQifX0sImRybSI6eyJuYW1lIjoid2lkZXZpbmUiLCJsZXZlbCI6IkwzIn0sInNlc3Npb25TdGFydFRpbWUiOjE3ODI3MzEzMzE2MjgsImlzcyI6ImJvb3QucGx1dG8udHYiLCJzdWIiOiJwcmk6djE6cGx1dG86ZGV2aWNlczpCUjpaVGt3TURreVpEWXROek5oWVMweE1XWXhMVGxpTmpJdE1EQXlNalE0TXpNeE9UVmgiLCJhdWQiOiIqLnBsdXRvLnR2IiwiZXhwIjoxNzgyODE3NzMxLCJpYXQiOjE3ODI3MzEzMzEsImp0aSI6IjBhODYwYjM4LWZlN2QtNDNhNi04YmYxLTMzNGM4MjdkOGU5NyJ9.4XDVNC9wp3ZW6xL0MLaWJ_ZulT_i25XO2ibFtCTbTm0&quality=720p&deviceMake=chrome&deviceType=web&deviceModel=web&deviceVersion=133.0.0&architecture=x86_64&buildVersion=1.0.0&includeExtendedEvents=true&masterJWTPassthrough=true',
    type: 'hls',
    description: 'Canal de exibição ininterrupta com os maiores sucessos e blockbusters internacionais dublados em excelente qualidade.',
    currentShow: 'Maratona Blockbuster',
    nextShow: 'Sessão Cinema Família'
  },
  {
    id: 'tv-series-retro',
    name: 'TV Séries Retrô',
    logo: 'SER',
    logoBg: 'bg-indigo-900',
    category: 'Filmes & Séries',
    streamUrl: 'https://stmv1.srvif.com/tvserie/tvserie/playlist.m3u8',
    type: 'hls',
    description: 'Reviva as melhores séries clássicas, dramáticas e comédias de época que conquistaram o coração de várias gerações.',
    currentShow: 'As Panteras',
    nextShow: 'Sessão Clássica de Mistério'
  },
  {
    id: 'globoplay-novelas',
    name: 'Globoplay Novelas Clássicas',
    logo: 'NOV',
    logoBg: 'bg-pink-600',
    category: 'Filmes & Séries',
    streamUrl: 'http://143.14.178.40:7777/Globoplay_Novelas_HD/index.m3u8',
    type: 'hls',
    backupUrl: 'http://170.82.202.31/Viva/index.m3u8',
    backupType: 'hls',
    description: 'Um canal totalmente focado em reexibir as maiores e mais queridas novelas brasileiras com muito drama e romance.',
    currentShow: 'Sessão Vale a Pena Ver de Novo',
    nextShow: 'Novelas de Ouro'
  },
  {
    id: 'canal-brasil-cine',
    name: 'Canal Brasil Filmes',
    logo: 'CBR',
    logoBg: 'bg-amber-700',
    category: 'Filmes & Séries',
    streamUrl: 'http://143.14.178.40:7777/Canal_Brasil_HD/index.m3u8',
    type: 'hls',
    description: 'Dedicado ao cinema nacional, exibindo produções de ficção, curta-metragens, documentários artísticos e shows de MPB.',
    currentShow: 'Cine Nacional Premiado',
    nextShow: 'Documentário Musical'
  },

  // --- DESENHOS & KIDS ---
  {
    id: 'cartoon-network',
    name: 'Cartoon Network',
    logo: 'CN',
    logoBg: 'bg-zinc-800',
    category: 'Desenhos & Kids',
    streamUrl: 'https://cdn-5.nxplay.com.br/CARTOON_NETWORK/index.m3u8',
    type: 'hls',
    backupUrl: 'https://cdn-5.nxplay.com.br/CARTOON_NETWORK_TK/index.m3u8',
    backupType: 'hls',
    description: 'O maior canal de desenhos animados do mundo, trazendo clássicos e novas produções como O Incrível Mundo de Gumball, Hora de Aventura, Apenas um Show e muito mais.',
    currentShow: 'O Incrível Mundo de Gumball',
    nextShow: 'Hora de Aventura'
  },
  {
    id: 'nicktoons-brasil',
    name: 'NickToons Brasil',
    logo: 'NTO',
    logoBg: 'bg-orange-600',
    category: 'Desenhos & Kids',
    streamUrl: 'https://stmv2.srvif.com/nicktoons/nicktoons/playlist.m3u8',
    type: 'hls',
    description: 'Aventuras ininterruptas com os personagens e desenhos animados de maior sucesso da Nickelodeon dublados em português.',
    currentShow: 'Bob Esponja Calça Quadrada',
    nextShow: 'Os Padrinhos Mágicos'
  },
  {
    id: 'pluto-tv-anime',
    name: 'Pluto TV Anime',
    logo: 'ANI',
    logoBg: 'bg-violet-600',
    category: 'Desenhos & Kids',
    streamUrl: 'https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/v2/stitch/hls/channel/5f12136385bccc00070142ed/master.m3u8?advertisingId=&appName=web&appVersion=8.1.0&app_name=web&clientDeviceType=0&clientID=e90092d6-73aa-11f1-9b62-00224833195a&clientModelNumber=1.0.0&country=BR&deviceDNT=false&deviceId=e90092d6-73aa-11f1-9b62-00224833195a&deviceLat=-22.9000&deviceLon=-43.3200&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=133.0.0&marketingRegion=BR&serverSideAds=false&sessionID=e90587f1-73aa-11f1-9d36-563000e8113a&sid=e90587f1-73aa-11f1-9d36-563000e8113a&userId=&jwt=eyJhbGciOiJIUzI1NiIsImtpZCI6IjY5NDBhYWZkLTNmY2UtNDZkNC05N2U4LTZkYWEzYjAwNDEzYiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSUQiOiJlOTA1ODdmMS03M2FhLTExZjEtOWQzNi01NjMwMDBlODExM2EiLCJjbGllbnRJUCI6IjE3Ny4xOTIuMjU1LjM4IiwiY2l0eSI6IlJpbyBEZSBKYW5laXJvIiwicG9zdGFsQ29kZSI6IjIwNzQwLTQ4MCIsImNvdW50cnkiOiJCUiIsImRtYSI6NzYwMDgsImFjdGl2ZVJlZ2lvbiI6IkJSIiwiZGV2aWNlTGF0IjotMjIuODk5OTk5NjE4NTMwMjczLCJkZXZpY2VMb24iOi00My4zMTk5OTk2OTQ4MjQyMiwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbiIsImRldmljZVR5cGUiOiJ3ZWIiLCJkZXZpY2VWZXJzaW9uIjoiMTMzLjAuMCIsImRldmljZU1ha2UiOiJjaHJvbWUiLCJkZXZpY2VNb2RlbCI6IndlYiIsImFwcE5hbWUiOiJ3ZWIiLCJhcHBWZXJzaW9uIjoiOC4xLjAiLCJjbGllbnRJRCI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImNtQXVkaWVuY2VJRCI6IiIsImlzQ2xpZW50RE5UIjpmYWxzZSwidXNlcklEIjoiIiwibG9nTGV2ZWwiOiJERUZBVUxUIiwidGltZVpvbmUiOiJBbWVyaWNhL1Nhb19QYXVsbyIsInNlcnZlclNpZGVBZHMiOmZhbHNlLCJlMmVCZWFjb25zIjpmYWxzZSwiZmVhdHVyZXMiOnsibXVsdGlQb2RBZHMiOnsiY29ob3J0IjoiIiwiZW5hYmxlZCI6dHJ1ZX0sInN0aXRjaGVySGxzTmciOnsiZGVtdXhlZEF1ZGlvIjoiaml0In19LCJmbXNQYXJhbXMiOnsiZndWY0lEMiI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImZ3VmNJRDJDb3BwYSI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImN1c3RvbVBhcmFtcyI6eyJmbXNfbGl2ZXJhbXBfaWRsIjoiIiwiZm1zX2VtYWlsaGFzaCI6IiIsImZtc19zdWJzY3JpYmVyaWQiOiIiLCJmbXNfaWZhIjoiIiwiZm1zX2lkZnYiOiIiLCJmbXNfdXNlcmlkIjoiZTkwMDkyZDYtNzNhYS0xMWYxLTliNjItMDAyMjQ4MzMxOTVhIiwiZm1zX3ZjaWQydHlwZSI6InVzZXJpZCIsImZtc19yYW1wX2lkIjoiIiwiZm1zX2hoX3JhbXBfaWQiOiIiLCJmbXNfYmlkaWR0eXBlIjoiMTA0NiIsIl9md18zUF9VSUQiOiJJREw6QXNMSmZaWS1DN1o5azgwUWMyLTAybzdvbzkteVdzNHYxZlpCa2Z2QUZCOGQwbVBEV29nWF9TVXl6c2EwNU1IblF1T1FGd0JFd3ZVMmczU1VrZWxldG5qNkd1a09CaUVwcGl5WEh1am5rUV9pUWpLa0Qtdi0tSVNJanFpMXlLVzlRVkZsaVlFZDQtM1dXOFlROEtRWmQxYTRvYUZTelpZdFpIdjV2d295Y3RESkUtRTM1eFN2Mmdfel9sX0g1T0lhd1hodENxUHBGNk9Od1JPVlBSSDNnRWFnQ0dRdWtEdU5GTXRjNTROME5Zam90ZVFwM0ZIUTh6OW42b0hKQ1EzY2ZuRlB1a0M3dWliSHNZZmtUc1A0bFdPems0a0xSS2FlT0ZQclBLWHZWX2h6Z1NnNGtoX180Szc0Vl9MM1hQUTZ1NFJaMTY2M2ZLekw1ckVrUDRXY1BvMGN6S0hNTkdlMmZvbjg4Y0FFWXciLCJmbXNfcnVsZWlkIjoiMTAwMTYsMTAwMjAsMTAwMDksMTAwMTMsMTAwMTUsMTAwMjEsMTAwMjMsMTAwMDAsMTAwMTQifX0sImRybSI6eyJuYW1lIjoid2lkZXZpbmUiLCJsZXZlbCI6IkwzIn0sInNlc3Npb25TdGFydFRpbWUiOjE3ODI3MzEzMzE2MjgsImlzcyI6ImJvb3QucGx1dG8udHYiLCJzdWIiOiJwcmk6djE6cGx1dG86ZGV2aWNlczpCUjpaVGt3TURreVpEWXROek5oWVMweE1XWXhMVGxpTmpJdE1EQXlNalE0TXpNeE9UVmgiLCJhdWQiOiIqLnBsdXRvLnR2IiwiZXhwIjoxNzgyODE3NzMxLCJpYXQiOjE3ODI3MzEzMzEsImp0aSI6IjBhODYwYjM4LWZlN2QtNDNhNi04YmYxLTMzNGM4MjdkOGU5NyJ9.4XDVNC9wp3ZW6xL0MLaWJ_ZulT_i25XO2ibFtCTbTm0&quality=720p&deviceMake=chrome&deviceType=web&deviceModel=web&deviceVersion=133.0.0&architecture=x86_64&buildVersion=1.0.0&includeExtendedEvents=true&masterJWTPassthrough=true',
    type: 'hls',
    description: 'O canal perfeito para os amantes da cultura pop japonesa com maratonas de animes clássicos e modernos de ação e aventura.',
    currentShow: 'Saga de Ação Anime',
    nextShow: 'Heróis Shinobi'
  },
  {
    id: 'gospel-cartoon',
    name: 'Gospel Cartoon Kids',
    logo: 'GCK',
    logoBg: 'bg-sky-500',
    category: 'Desenhos & Kids',
    streamUrl: 'https://stmv1.srvif.com/gospelcartoon/gospelcartoon/playlist.m3u8',
    type: 'hls',
    description: 'Desenhos animados educativos, cantigas de roda e animações com foco em valores para crianças pequenas.',
    currentShow: 'Desenhos Educativos',
    nextShow: 'Cantigas Animadas'
  },
  {
    id: 'desenhos-retro',
    name: 'Desenhos Antigos Clássicos',
    logo: 'RET',
    logoBg: 'bg-amber-700',
    category: 'Desenhos & Kids',
    type: 'hls',
    streamUrl: 'https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/v2/stitch/hls/channel/655e5c4d2c46f3000877a54b/master.m3u8?advertisingId=&appName=web&appVersion=8.1.0&app_name=web&clientDeviceType=0&clientID=e90092d6-73aa-11f1-9b62-00224833195a&clientModelNumber=1.0.0&country=BR&deviceDNT=false&deviceId=e90092d6-73aa-11f1-9b62-00224833195a&deviceLat=-22.9000&deviceLon=-43.3200&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=133.0.0&marketingRegion=BR&serverSideAds=false&sessionID=e90587f1-73aa-11f1-9d36-563000e8113a&sid=e90587f1-73aa-11f1-9d36-563000e8113a&userId=&jwt=eyJhbGciOiJIUzI1NiIsImtpZCI6IjY5NDBhYWZkLTNmY2UtNDZkNC05N2U4LTZkYWEzYjAwNDEzYiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSUQiOiJlOTA1ODdmMS03M2FhLTExZjEtOWQzNi01NjMwMDBlODExM2EiLCJjbGllbnRJUCI6IjE3Ny4xOTIuMjU1LjM4IiwiY2l0eSI6IlJpbyBEZSBKYW5laXJvIiwicG9zdGFsQ29kZSI6IjIwNzQwLTQ4MCIsImNvdW50cnkiOiJCUiIsImRtYSI6NzYwMDgsImFjdGl2ZVJlZ2lvbiI6IkJSIiwiZGV2aWNlTGF0IjotMjIuODk5OTk5NjE4NTMwMjczLCJkZXZpY2VMb24iOi00My4zMTk5OTk2OTQ4MjQyMiwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbiIsImRldmljZVR5cGUiOiJ3ZWIiLCJkZXZpY2VWZXJzaW9uIjoiMTMzLjAuMCIsImRldmljZU1ha2UiOiJjaHJvbWUiLCJkZXZpY2VNb2RlbCI6IndlYiIsImFwcE5hbWUiOiJ3ZWIiLCJhcHBWZXJzaW9uIjoiOC4xLjAiLCJjbGllbnRJRCI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImNtQXVkaWVuY2VJRCI6IiIsImlzQ2xpZW50RE5UIjpmYWxzZSwidXNlcklEIjoiIiwibG9nTGV2ZWwiOiJERUZBVUxUIiwidGltZVpvbmUiOiJBbWVyaWNhL1Nhb19QYXVsbyIsInNlcnZlclNpZGVBZHMiOmZhbHNlLCJlMmVCZWFjb25zIjpmYWxzZSwiZmVhdHVyZXMiOnsibXVsdGlQb2RBZHMiOnsiY29ob3J0IjoiIiwiZW5hYmxlZCI6dHJ1ZX0sInN0aXRjaGVySGxzTmciOnsiZGVtdXhlZEF1ZGlvIjoiaml0In19LCJmbXNQYXJhbXMiOnsiZndWY0lEMiI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImZ3VmNJRDJDb3BwYSI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImN1c3RvbVBhcmFtcyI6eyJmbXNfbGl2ZXJhbXBfaWRsIjoiIiwiZm1zX2VtYWlsaGFzaCI6IiIsImZtc19zdWJzY3JpYmVyaWQiOiIiLCJmbXNfaWZhIjoiIiwiZm1zX2lkZnYiOiIiLCJmbXNfdXNlcmlkIjoiZTkwMDkyZDYtNzNhYS0xMWYxLTliNjItMDAyMjQ4MzMxOTVhIiwiZm1zX3ZjaWQydHlwZSI6InVzZXJpZCIsImZtc19yYW1wX2lkIjoiIiwiZm1zX2hoX3JhbXBfaWQiOiIiLCJmbXNfYmlkaWR0eXBlIjoiMTA0NiIsIl9md18zUF9VSUQiOiJJREw6QXNMSmZaWS1DN1o5azgwUWMyLTAybzdvbzkteVdzNHYxZlpCa2Z2QUZCOGQwbVBEV29nWF9TVXl6c2EwNU1IblF1T1FGd0JFd3ZVMmczU1VrZWxldG5qNkd1a09CaUVwcGl5WEh1am5rUV9pUWpLa0Qtdi0tSVNJanFpMXlLVzlRVkZsaVlFZDQtM1dXOFlROEtRWmQxYTRvYUZTelpZdFpIdjV2d295Y3RESkUtRTM1eFN2Mmdfel9sX0g1T0lhd1hodENxUHBGNk9Od1JPVlBSSDNnRWFnQ0dRdWtEdU5GTXRjNTROME5Zam90ZVFwM0ZIUTh6OW42b0hKQ1EzY2ZuRlB1a0M3dWliSHNZZmtUc1A0bFdPems0a0xSS2FlT0ZQclBLWHZWX2h6Z1NnNGtoX180Szc0Vl9MM1hQUTZ1NFJaMTY2M2ZLekw1ckVrUDRXY1BvMGN6S0hNTkdlMmZvbjg4Y0FFWXciLCJmbXNfcnVsZWlkIjoiMTAwMTYsMTAwMjAsMTAwMDksMTAwMTMsMTAwMTUsMTAwMjEsMTAwMjMsMTAwMDAsMTAwMTQifX0sImRybSI6eyJuYW1lIjoid2lkZXZpbmUiLCJsZXZlbCI6IkwzIn0sInNlc3Npb25TdGFydFRpbWUiOjE3ODI3MzEzMzE2MjgsImlzcyI6ImJvb3QucGx1dG8udHYiLCJzdWIiOiJwcmk6djE6cGx1dG86ZGV2aWNlczpCUjpaVGt3TURreVpEWXROek5oWVMweE1XWXhMVGxpTmpJdE1EQXlNalE0TXpNeE9UVmgiLCJhdWQiOiIqLnBsdXRvLnR2IiwiZXhwIjoxNzgyODE3NzMxLCJpYXQiOjE3ODI3MzEzMzEsImp0aSI6IjBhODYwYjM4LWZlN2QtNDNhNi04YmYxLTMzNGM4MjdkOGU5NyJ9.4XDVNC9wp3ZW6xL0MLaWJ_ZulT_i25XO2ibFtCTbTm0&quality=720p&deviceMake=chrome&deviceType=web&deviceModel=web&deviceVersion=133.0.0&architecture=x86_64&buildVersion=1.0.0&includeExtendedEvents=true&masterJWTPassthrough=true',
    backupUrl: 'https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/v2/stitch/hls/channel/6824ce10c5d53e1351ceb8d1/master.m3u8?advertisingId=&appName=web&appVersion=8.1.0&app_name=web&clientDeviceType=0&clientID=e90092d6-73aa-11f1-9b62-00224833195a&clientModelNumber=1.0.0&country=BR&deviceDNT=false&deviceId=e90092d6-73aa-11f1-9b62-00224833195a&deviceLat=-22.9000&deviceLon=-43.3200&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=133.0.0&marketingRegion=BR&serverSideAds=false&sessionID=e90587f1-73aa-11f1-9d36-563000e8113a&sid=e90587f1-73aa-11f1-9d36-563000e8113a&userId=&jwt=eyJhbGciOiJIUzI1NiIsImtpZCI6IjY5NDBhYWZkLTNmY2UtNDZkNC05N2U4LTZkYWEzYjAwNDEzYiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSUQiOiJlOTA1ODdmMS03M2FhLTExZjEtOWQzNi01NjMwMDBlODExM2EiLCJjbGllbnRJUCI6IjE3Ny4xOTIuMjU1LjM4IiwiY2l0eSI6IlJpbyBEZSBKYW5laXJvIiwicG9zdGFsQ29kZSI6IjIwNzQwLTQ4MCIsImNvdW50cnkiOiJCUiIsImRtYSI6NzYwMDgsImFjdGl2ZVJlZ2lvbiI6IkJSIiwiZGV2aWNlTGF0IjotMjIuODk5OTk5NjE4NTMwMjczLCJkZXZpY2VMb24iOi00My4zMTk5OTk2OTQ4MjQyMiwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbiIsImRldmljZVR5cGUiOiJ3ZWIiLCJkZXZpY2VWZXJzaW9uIjoiMTMzLjAuMCIsImRldmljZU1ha2UiOiJjaHJvbWUiLCJkZXZpY2VNb2RlbCI6IndlYiIsImFwcE5hbWUiOiJ3ZWIiLCJhcHBWZXJzaW9uIjoiOC4xLjAiLCJjbGllbnRJRCI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImNtQXVkaWVuY2VJRCI6IiIsImlzQ2xpZW50RE5UIjpmYWxzZSwidXNlcklEIjoiIiwibG9nTGV2ZWwiOiJERUZBVUxUIiwidGltZVpvbmUiOiJBbWVyaWNhL1Nhb19QYXVsbyIsInNlcnZlclNpZGVBZHMiOmZhbHNlLCJlMmVCZWFjb25zIjpmYWxzZSwiZmVhdHVyZXMiOnsibXVsdGlQb2RBZHMiOnsiY29ob3J0IjoiIiwiZW5hYmxlZCI6dHJ1ZX0sInN0aXRjaGVySGxzTmciOnsiZGVtdXhlZEF1ZGlvIjoiaml0In19LCJmbXNQYXJhbXMiOnsiZndWY0lEMiI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImZ3VmNJRDJDb3BwYSI6ImU5MDA5MmQ2LTczYWEtMTFmMS05YjYyLTAwMjI0ODMzMTk1YSIsImN1c3RvbVBhcmFtcyI6eyJmbXNfbGl2ZXJhbXBfaWRsIjoiIiwiZm1zX2VtYWlsaGFzaCI6IiIsImZtc19zdWJzY3JpYmVyaWQiOiIiLCJmbXNfaWZhIjoiIiwiZm1zX2lkZnYiOiIiLCJmbXNfdXNlcmlkIjoiZTkwMDkyZDYtNzNhYS0xMWYxLTliNjItMDAyMjQ4MzMxOTVhIiwiZm1zX3ZjaWQydHlwZSI6InVzZXJpZCIsImZtc19yYW1wX2lkIjoiIiwiZm1zX2hoX3JhbXBfaWQiOiIiLCJmbXNfYmlkaWR0eXBlIjoiMTA0NiIsIl9md18zUF9VSUQiOiJJREw6QXNMSmZaWS1DN1o5azgwUWMyLTAybzdvbzkteVdzNHYxZlpCa2Z2QUZCOGQwbVBEV29nWF9TVXl6c2EwNU1IblF1T1FGd0JFd3ZVMmczU1VrZWxldG5qNkd1a09CaUVwcGl5WEh1am5rUV9pUWpLa0Qtdi0tSVNJanFpMXlLVzlRVkZsaVlFZDQtM1dXOFlROEtRWmQxYTRvYUZTelpZdFpIdjV2d295Y3RESkUtRTM1eFN2Mmdfel9sX0g1T0lhd1hodENxUHBGNk9Od1JPVlBSSDNnRWFnQ0dRdWtEdU5GTXRjNTROME5Zam90ZVFwM0ZIUTh6OW42b0hKQ1EzY2ZuRlB1a0M3dWliSHNZZmtUc1A0bFdPems0a0xSS2FlT0ZQclBLWHZWX2h6Z1NnNGtoX180Szc0Vl9MM1hQUTZ1NFJaMTY2M2ZLekw1ckVrUDRXY1BvMGN6S0hNTkdlMmZvbjg4Y0FFWXciLCJmbXNfcnVsZWlkIjoiMTAwMTYsMTAwMjAsMTAwMDksMTAwMTMsMTAwMTUsMTAwMjEsMTAwMjMsMTAwMDAsMTAwMTQifX0sImRybSI6eyJuYW1lIjoid2lkZXZpbmUiLCJsZXZlbCI6IkwzIn0sInNlc3Npb25TdGFydFRpbWUiOjE3ODI3MzEzMzE2MjgsImlzcyI6ImJvb3QucGx1dG8udHYiLCJzdWIiOiJwcmk6djE6cGx1dG86ZGV2aWNlczpCUjpaVGt3TURreVpEWXROek5oWVMweE1XWXhMVGxpTmpJdE1EQXlNalE0TXpNeE9UVmgiLCJhdWQiOiIqLnBsdXRvLnR2IiwiZXhwIjoxNzgyODE3NzMxLCJpYXQiOjE3ODI3MzEzMzEsImp0aSI6IjBhODYwYjM4LWZlN2QtNDNhNi04YmYxLTMzNGM4MjdkOGU5NyJ9.4XDVNC9wp3ZW6xL0MLaWJ_ZulT_i25XO2ibFtCTbTm0&quality=720p&deviceMake=chrome&deviceType=web&deviceModel=web&deviceVersion=133.0.0&architecture=x86_64&buildVersion=1.0.0&includeExtendedEvents=true&masterJWTPassthrough=true',
    backupType: 'hls',
    description: 'Reviva sua infância com desenhos clássicos icônicos dos anos 70, 80 e 90 com muita nostalgia.',
    currentShow: 'Sessão Clássicos Animados',
    nextShow: 'Aventuras Nostálgicas'
  }
];

// Generates a dynamic schedule based on current hour to make it look active and live
export function generateScheduleForChannel(channelId: string): Program[] {
  const currentHour = new Date().getHours();
  
  const schedules: Record<string, { title: string; desc: string; category: string }[]> = {
    'cartoon-network': [
      { title: 'O Incrível Mundo de Gumball', desc: 'Acompanhe as aventuras surreais do gato azul Gumball e seu irmão adotivo, Darwin.', category: 'Desenhos' },
      { title: 'Hora de Aventura', desc: 'Finn e Jake enfrentam perigos misteriosos na Terra de Ooo.', category: 'Desenhos' },
      { title: 'Apenas um Show', desc: 'Mordecai e Rigby tentam evitar o trabalho no parque de todas as formas possíveis.', category: 'Desenhos' },
      { title: 'Ben 10', desc: 'Ben Tennyson descobre um relógio alienígena super poderoso e protege a Terra.', category: 'Desenhos' },
      { title: 'As Meninas Superpoderosas', desc: 'Florzinha, Lindinha e Docinho lutam contra o crime na cidade de Townsville.', category: 'Desenhos' },
      { title: 'Jovens Titãs em Ação', desc: 'Robin, Estelar, Ciborgue, Ravena e Mutano vivem aventuras engraçadas na torre dos Titãs.', category: 'Desenhos' },
    ],
    'record-news': [
      { title: 'Jornal da Record News', desc: 'Edição com os principais destaques nacionais e internacionais.', category: 'Jornalismo' },
      { title: 'Hora News', desc: 'Boletins dinâmicos com informações em tempo real direto da redação.', category: 'Jornalismo' },
      { title: 'Record News Paulista', desc: 'Noticiário focado na região metropolitana de São Paulo.', category: 'Jornalismo' },
      { title: 'Aldeia Global', desc: 'Notícias internacionais comentadas por correspondentes exclusivos.', category: 'Documentário' },
      { title: 'Esporte Record News', desc: 'Resumo das rodadas, gols e o mercado da bola.', category: 'Esportes' },
      { title: 'Eco Record News', desc: 'Iniciativas sustentáveis, meio ambiente e ecologia prática.', category: 'Cultura' },
    ],
    'tv-brasil': [
      { title: 'Repórter Brasil', desc: 'Telejornal noturno com notícias aprofundadas sobre cidadania e economia.', category: 'Jornalismo' },
      { title: 'Sem Censura', desc: 'Roda de debate com convidados do mundo das artes, literatura e política.', category: 'Debate' },
      { title: 'Cine Nacional', desc: 'Grandes obras do cinema brasileiro independente e clássico.', category: 'Filme' },
      { title: 'Brasil Visual', desc: 'Artes visuais e patrimônio histórico em um tour de imagens.', category: 'Cultura' },
      { title: 'Estação Plural', desc: 'Debate sobre diversidade, cultura pop e direitos civis.', category: 'Cultura' },
      { title: 'Curta Brasil', desc: 'Mostra de curtas-metragens premiados em festivals nacionais.', category: 'Filme' },
    ],
    'tv-globo': [
      { title: 'Jornal Nacional', desc: 'O principal e mais completo noticiário da TV brasileira ao vivo.', category: 'Jornalismo' },
      { title: 'Novela das Nove', desc: 'O mais novo capítulo da grande superprodução dramática diária.', category: 'Entretenimento' },
      { title: 'Globo Esporte', desc: 'Giro completo das notícias, gols e tabelas de todos os times do país.', category: 'Esportes' },
      { title: 'Mais Você', desc: 'Ana Maria Braga apresenta receitas, reportagens e conversas descontraídas.', category: 'Entretenimento' },
      { title: 'Fantástico', desc: 'A revista eletrônica de jornalismo de investigação, ciências e shows de domingo.', category: 'Jornalismo' },
      { title: 'Cine Espetacular', desc: 'Sucessos premiados de Hollywood dublados em alta definição.', category: 'Filme' },
    ],
    'tv-cultura': [
      { title: 'Jornal da Cultura', desc: 'Jornalismo crítico com debates em estúdio de filósofos e cientistas.', category: 'Jornalismo' },
      { title: 'Roda Viva', desc: 'A mais tradicional mesa de entrevistas de televisão brasileira.', category: 'Entrevista' },
      { title: 'Quintal da Cultura', desc: 'Programação infantil premiada com jogos, histórias e brincadeiras.', category: 'Infantil' },
      { title: 'Provoca', desc: 'Marcelo Tas entrevista personalidades provocando reflexões profundas.', category: 'Entrevista' },
      { title: 'Metrópolis', desc: 'A agenda cultural de cinema, teatro, música e literatura do país.', category: 'Cultura' },
      { title: 'Sr. Brasil', desc: 'Rolando Boldrin celebra a música de raiz e a cultura interiorana.', category: 'Música' },
    ]
  };

  const defaultPrograms = [
    { title: 'Telejornal Local', desc: 'Informativo comunitário com os fatos da sua região.', category: 'Jornalismo' },
    { title: 'Variedades da Tarde', desc: 'Moda, culinária, bem-estar e entretenimento diário.', category: 'Entretenimento' },
    { title: 'Sessão Nostalgia', desc: 'Exibição de conteúdos clássicos, séries históricas e recordações.', category: 'Entretenimento' },
    { title: 'Espaço Debate', desc: 'Mesa redonda discutindo esportes, comportamento e sociedade.', category: 'Debate' },
    { title: 'Documentários Especiais', desc: 'Séries premiadas explorando a ciência, vida selvagem e espaço.', category: 'Documentário' },
    { title: 'Espaço Musical', desc: 'Shows ao vivo e clipes que marcaram gerações na TV.', category: 'Música' },
  ];

  const channelProgList = schedules[channelId] || defaultPrograms;
  const programs: Program[] = [];

  // Create 6 dynamic slots starting from 2 hours ago
  for (let i = -1; i < 5; i++) {
    const slotHour = (currentHour + i * 2 + 24) % 24;
    const timeStr = `${slotHour.toString().padStart(2, '0')}:00`;
    const idx = Math.abs(slotHour % channelProgList.length);
    const progData = channelProgList[idx];

    programs.push({
      id: `${channelId}-${slotHour}`,
      title: progData.title,
      time: timeStr,
      duration: 120,
      description: progData.desc,
      category: progData.category
    });
  }

  return programs;
}

export const CHAT_COMMENT_TEMPLATES = [
  "Que imagem excelente! Sinal digital limpo demais.",
  "Esse programa é muito bom, não perco um dia!",
  "Finalmente um app de TV aberta de respeito que funciona!",
  "Olha a notícia que absurdo!",
  "Quem mais tá assistindo de São Paulo? Dá um salve!",
  "Aqui em BH o sinal tá voando!",
  "Eita novela boa, tá pegando fogo o capítulo hoje!",
  "Gosto muito das reportagens desse canal.",
  "O áudio tá super sincronizado, show!",
  "TV aberta de graça e na web é outro nível.",
  "Estou assistindo na TV Smart e a resolução tá top.",
  "Adoro o apresentador desse jornal.",
  "Esse documentário é fantástico!",
  "Chama a galera pra ver, o debate tá quente hoje.",
  "Caramba, não sabia que dava pra colocar link customizado! Sensacional.",
  "Meu canal favorito sempre online."
];

export const CHAT_USERS = [
  "Rafa_Silva", "Fernanda19", "Carioca_Gamer", "LucianaBH", "Thiago_SP", 
  "Marcos_RS", "Ana_Ju", "Gabi_Mendes", "BrunoX", "Carlos_Sena", 
  "Beatriz_Rodrigues", "Danilo_Nordeste", "Mari_Moreira", "Zeca_TV"
];

export const CHAT_EMOJIS = ["📺", "👏", "🔥", "😲", "🤩", "👍", "❤️", "🗣️", "👀"];
