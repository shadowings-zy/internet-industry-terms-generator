// 主题
let subject = '互联网人为什么不好好说话'

// 论述
const discuss = [
  '既然如此，',
  '那么，',
  '我认为，',
  '一般来说，',
  '总的来说，',
  '经过上述讨论，',
  '解决{主题}的问题，首先要找到抓手。 所以，',
  '每个人都不得不复盘这些问题。 在拉通对齐这种问题时，',
  '而这些问题并不是痛点，而我们需要聚焦的关键是，',
  '带着这些问题，我们来聚焦一下——{主题}，',
  '{主题}的抓手是什么？方法论又该如何寻找？',
  '{主题}的打法，到底是怎样的，而聚焦{主题}本身，又会沉淀出什么样的方法论？',
  '要想清楚，{主题}，到底是对标一种什么样的存在？',
  '{主题}，到底到底该如何落地？',
  '了解清楚{主题}到底存在于哪条赛道，是解决一切问题的痛点。$',
  '打造业务和数据的闭环对{主题}的解决意义重大。$',
  '我们都必须串联相关生态，去思考有关{主题}的问题。$',
  '我们认为，找到抓手，形成方法论，{主题}则会迎刃而解。$',
  '所谓{主题}，关键是{主题}如何才能赋能目标，进而反哺目标生态。$',
]

// 名人名言
const famousRemark = [
  '互联网产品经理间{前引语}，如何强化认知，快速响应，是非常值得跟进的。{后引语}',
  '互联网研发人员间{前引语}，在细分领域找到抓手，形成方法论，才能对外输出，反哺生态。{后引语}',
  '互联网大厂管理人员间{前引语}，找到正确的赛道，选择正确的商业模式，才能将项目落地。{后引语}',
  '互联网从业者间{前引语}，只有适度倾斜资源，才能赋能整体业务。{后引语}',
  '互联网间{前引语}，好的产品要分析用户痛点，击穿用户心智。{后引语}',
  '互联网运营人员间{前引语}，做精细化运营，向目标发力，才能获得影响力。{后引语}',
]

// 后引语
const postscript = [
  '这不禁令我深思。',
  '带着这句话，我们还要更加慎重的去对齐这个问题：',
  '这让我明白了问题的抓手，',
  '这句话语虽然很短，但沉淀之后真的能发现痛点。',
  '也许这句话就是最好的答案。$',
]

// 前引语
const introduction = ['流传着这样一句话', '有着这样的共识']

// 取随机数
function random(min = 0, max = 100) {
  return Math.random() * (max - min) + min
}

// 取随机句
function randomSentence(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// 取随机名人名言
function randomFamousRemark() {
  return randomSentence(famousRemark)
    .replace('{前引语}', randomSentence(introduction))
    .replace('{后引语}', randomSentence(postscript))
}

// 取随机论述
function randomDiscuss() {
  let sentence = randomSentence(discuss)
  sentence = sentence.replace(RegExp('{主题}', 'g'), subject)
  return sentence
}

// 添加段落
function addParagraph(chapter) {
  return '　　' + chapter.replace(/\$/g, '')
}

function generate() {
  subject = document.querySelector('input').value
  let article = []
  let chapter = ''
  let chapterLength = 0
  while (chapterLength < 1000 || chapter[chapter.length - 1] !== '$' || article.length < 2) {
    let randomNum = random(0, 100)
    if (randomNum < 30 && chapter.length > 100 && chapter[chapter.length - 1] === '$') {
      chapter = addParagraph(chapter)
      article.push(chapter)
      chapter = ''
    } else if (randomNum < 40) {
      let sentence = randomFamousRemark()
      chapterLength = chapterLength + sentence.length
      chapter = chapter + sentence
    } else {
      let sentence = randomDiscuss()
      chapterLength = chapterLength + sentence.length
      chapter = chapter + sentence
    }
  }
  chapter = addParagraph(chapter)
  article.push(chapter)

  document.querySelector('#text').innerHTML = '<div class="content">' + article.join('</div><div class="content">') + '</div>'
}

document.querySelector('#generate').addEventListener('click', function() {
    generate()
})
