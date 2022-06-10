import pandas as pd

# importing necessary libraries
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

from AphisClassBack.models import Aphis


def classify_knn(test_aphid: Aphis, all_aphids: any):
    print(test_aphid)
    test_aphid['name'] = ''  # sztucznie wyzerowane - zrobić nowy model na klasyfikacje(?)
    # test_aphid['date'] = test_aphid['date'].strftime('%m/%d/%Y')

    # print(all_aphids)
    train = pd.DataFrame(all_aphids)
    train['date'] = train['date'].astype(str)

    data = train.iloc[:, [3, 4, 5, 6, 7]]  # kolumny z danymi - 0 to id, 2 - data pominięto
    decision_attr = train.iloc[:, [1]]

    knn = KNeighborsClassifier(n_neighbors=3).fit(data, decision_attr)

    test_aphid_df = pd.DataFrame([test_aphid])
    print(test_aphid_df.to_string())
    test_aphid_df['date'] = test_aphid_df['date'].astype(str)
    test_aphid_df_data = test_aphid_df.iloc[:, [2, 3, 4, 5, 6]]  # kolumny z danymi - 0 to id, 2 - data pominięto
    test_aphid_df_decision_attr = test_aphid_df.iloc[:, [0]]

    # test_aphid_data = [[float(test_aphid['length_of_body']), float(test_aphid['hind_femora_length']), float(test_aphid['hind_tibia_lenght']),
    #                     int(test_aphid['number_of_setae_on_cauda']), float(test_aphid['cauda_length'])]]
    # test_aphid_decision_attr = [[test_aphid['name']]]

    # print(test_aphid_data)

    available_values = train['name'].unique()  # dla każdej z wartości zrobić predykcję (?)
    print('available values: ', available_values)

    knn_predictions = knn.predict(test_aphid_df_data)
    print('Najlepsza predykcja: ', knn_predictions)

    accuracy = knn.score(test_aphid_df_data, pd.DataFrame(data={'name': [knn_predictions[0]]}))
    print('accuracy: ', accuracy)

    cm = confusion_matrix(test_aphid_df_decision_attr, knn_predictions)

    print('confusion matrix: ', cm)

    return {'prediction': knn_predictions[0], 'accuracy': accuracy}