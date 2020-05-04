import axios from 'axios';
import { sendMessage, newMessageId } from '@/events/MessageService';

const baseUrl = process.env.VUE_APP_ROOT_API;

const state = {
  texts: [],
};

const getters = {
  getSnippets: (state: any) => {
    return state.texts;
  },
};

const actions = {
  async fetchSnippets(
    { commit }: { commit: any },
    {
      language,
      unit,
      count,
      strategy,
    }: { language: string; unit: string; count: number; strategy: string }
  ) {
    const messageId = newMessageId();
    sendMessage('notification', true, {
      id: messageId,
      type: 'running',
      message: 'Randomizing text',
    });
    sendMessage('spinner');
    const response = await axios.get(
      //`https://jsonplaceholder.typicode.com/posts?_limit=${count}`
      // 'https://jsonplaceholder.typicode.com/posts'
      `${baseUrl}/api/text/generate/${language}/${unit}?count=${count}&strategy=${strategy}`
    );
    sendMessage('spinner', false);
    sendMessage('notification', true, {
      id: messageId,
      type: 'success',
      message: 'Text generated',
      duration: 3000,
    });
    commit('UPDATE_TEXTS', response.data.data);
  },
  removeSnippet({ commit }: any, index: number) {
    // console.log(index);
  },
};

const mutations = {
  UPDATE_TEXTS: (state: any, texts: any) => {
    state.texts = texts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};