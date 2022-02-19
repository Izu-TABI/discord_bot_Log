const Discord = require('discord.js');

const { Client, Intents, } = require('discord.js');

const client = new Client ({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES,"GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.once('ready', () => {
    console.log('Ready!');
});
client.on('ready', () => {
    client.user.setActivity('log管理', { type: 'PLAYING' })
});
    
client.on('messageCreate', massage => {
    if(massage.content === '!ping'){
        massage.channel.send('pong');
    }
  
    
})



client.on('voiceStateUpdate', (oldState, newState) => {
    let oldVoice = oldState.channelId; 
    let newVoice = newState.channelId;
   
    if (oldVoice != newVoice) {


      if (oldVoice == null) {
        console.log('join');
          const voiceChannel = client.guilds.cache.get("yourGuildId").channels.cache.get(newVoice);
          let membersInChannel = voiceChannel.members.size;  
        if(membersInChannel === 1){
          oldState.guild.channels.cache.get('yourChannelId').send(`@everyone`);//ボイスチャンネルに自分以外誰も入っていなかったらみんなをメンションする
        }

        oldState.guild.channels.cache.get('yourChannelId').send(`${oldState.member.user}が${oldState.guild.channels.cache.get(newVoice)}(.vc)に参加しました。`);
      } else if (newVoice == null) {
          console.log('left');
          newState.guild.channels.cache.get('yourChannelId').send(`${newState.member.user}が${oldState.guild.channels.cache.get(oldVoice)}を抜けました。`);
       
      } else {
          console.log('swich');
          newState.guild.channels.cache.get('yourChannelId').send(`${newState.member.user}が${oldState.guild.channels.cache.get(oldVoice)}から${oldState.guild.channels.cache.get(newVoice)}へ移動しました。`);
      }
    }

     
});

client.on('channelCreate', massage =>{
    massage.guild.channels.cache.get("yourChannelId").send('チャンネルが作成されました。');
});

client.on("guildMemberAdd", member => {
    if (member.guild.id !== "yourGuildId") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("yourChannelId").send(`${member.user}が$参加しました！`);
});

client.on("guildMemberRemove", member => {
    if (member.guild.id !== "yourGuildId") return; // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get("yourChannelId").send(`${member.user.tag}が退出しました。`);
});



client.login('yourBotToken');