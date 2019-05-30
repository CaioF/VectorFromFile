# -*- coding: utf-8 -*-
import io
import numpy as np
import nltk #natural language processing
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import gensim #ML word vector model
from gensim.models import Word2Vec
from collections import Counter
from pymystem3 import Mystem
from string import punctuation


class Analyzer:
    def __init__(self, path):
        self.path = path
        self.file = io.open(path, mode="r", encoding="utf-8")
        self.mystem = Mystem()
        self.russian_stopwords = stopwords.words("russian")
        self.stopwords2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'че', 'это', '://', 'https', 'com', 'ока', 'http', 'ru', 'https', 'com', 'www', 'eee', 'pdf', 'q', '],', '], ', '[', '[']
    def getPreprocessedData(self):
        sample = self.file.read()
        tokens = self.mystem.lemmatize(sample.replace("\n", " ").lower())
        tokens = [token for token in tokens if token not in self.russian_stopwords and token not in self.stopwords2 and token != " " and token.strip() not in punctuation]
        s = " ".join(tokens)
        data = []
        for i in sent_tokenize(s):
            temp = []
            for j in word_tokenize(i):
                temp.append(j)
            data.append(temp)
        return data, tokens
    def getModel(self, data):
        model = gensim.models.Word2Vec(data, min_count = 1, size = 100, window = 5, sg = 1)
        print('model ready')
        return model
    def printResult(self, model, sample):
        words_to_count = (word for word in sample)
        c = Counter(words_to_count)
        for i in c.most_common(20):
            print(i)
            print((model.wv[i[0]].tolist())[:3])
            print(model.wv.similar_by_word(i[0], topn=10, restrict_vocab=None))
            print('\n')

analyzer1 = Analyzer("C:\\Users\\prestigio\\Downloads\\Messages(48515).txt")
analyzer2 = Analyzer("C:\\Users\\prestigio\\Downloads\\Messages2(20408).txt")
data1, sample1 = analyzer1.getPreprocessedData()
data2, sample2 = analyzer2.getPreprocessedData()
model1 = analyzer1.getModel(data1)
model2 = analyzer2.getModel(data2)
analyzer1.printResult(model1, sample1)
analyzer2.printResult(model2, sample2)
