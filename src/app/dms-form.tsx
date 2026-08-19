import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DOCUMENT_NATURE_OPTIONS = ["Notice", "Circular", "Letter", "Memo", "Order"];
const DOCUMENT_CATEGORY_OPTIONS = ["General", "Confidential", "Urgent", "Routine"];
const RO_OPTIONS = [
  "R Office Lahore (LH-1)",
  "R Office Lahore (LH-2)",
  "R Office Lahore (LH-3)",
  "R Office Okara",
  "R Office Sahiwal",
  "R Office Multan",
  "R Office Rawalpindi",
];

export default function DmsForm() {
  const [issueDate, setIssueDate] = useState("");
  const [dateObj, setDateObj] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [documentNature, setDocumentNature] = useState("");
  const [documentCategory, setDocumentCategory] = useState("");
  const [selectedROs, setSelectedROs] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");

  const [showNatureDropdown, setShowNatureDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showRODropdown, setShowRODropdown] = useState(false);

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      setIssueDate(`${day}/${month}/${year}`);
    }
  };

  const toggleRO = (ro: string) => {
    if (selectedROs.includes(ro)) {
      setSelectedROs(selectedROs.filter((item) => item !== ro));
    } else {
      setSelectedROs([...selectedROs, ro]);
    }
  };

  const handleSubmit = () => {
    if (!issueDate || !title || !documentNature || !documentCategory || selectedROs.length === 0) {
      console.log("Error", "Please fill all required fields.");
      return;
    }
    console.log("Success", "Document submitted successfully!");
  };

  const handleCancel = () => {
    setIssueDate("");
    setDateObj(new Date());
    setTitle("");
    setKeywords("");
    setIssuedBy("");
    setDocumentNature("");
    setDocumentCategory("");
    setSelectedROs([]);
    setFileName("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
{/* >>>> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Document Management System (DMS)
          </Text>
        </View>

          {/* >>>>>>>>>> */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>
              Issue / Update Date <Text style={styles.required}>*</Text>
            </Text>
            <Pressable
              style={styles.inputBox}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={issueDate ? styles.inputText : styles.placeholderText}>
                {issueDate || "dd/mm/yyyy"}
              </Text>
              <Text style={styles.iconRight}>📅</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dateObj}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onValueChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>
              Document Nature <Text style={styles.required}>*</Text>
            </Text>
            <Pressable
              style={styles.inputBox}
              onPress={() => setShowNatureDropdown(true)}
            >
              <Text style={documentNature ? styles.inputText : styles.placeholderText}>
                {documentNature || "--Select--"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </Pressable>
          </View>
        </View>
{/* >>>>>> */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Title <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter Title Here..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            multiline={true}
            numberOfLines={3}
          />
        </View>

{/* >>>> */}
        <View style={styles.field}>
          <Text style={styles.label}>Keywords</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Add Keywords..."
            placeholderTextColor="#999"
            value={keywords}
            onChangeText={setKeywords}
            multiline={true}
            numberOfLines={3}
          />
        </View>
{/* >>>> */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Issued By</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name..."
              placeholderTextColor="#999"
              value={issuedBy}
              onChangeText={setIssuedBy}
            />
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>
              Document Category <Text style={styles.required}>*</Text>
            </Text>
            <Pressable
              style={styles.inputBox}
              onPress={() => setShowCategoryDropdown(true)}
            >
              <Text style={documentCategory ? styles.inputText : styles.placeholderText}>
                {documentCategory || "--Select--"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </Pressable>
          </View>
        </View>
{/* >>>> */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>
              Select RO <Text style={styles.required}>*</Text>
            </Text>
            <Pressable
              style={styles.inputBox}
              onPress={() => setShowRODropdown(true)}
            >
              <Text
                style={selectedROs.length > 0 ? styles.inputText : styles.placeholderText}
                numberOfLines={1}
              >
                {selectedROs.length > 0
                  ? selectedROs.join(", ")
                  : "Select Some Options"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </Pressable>
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>
              Upload File <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.fileRow}>
              <Pressable
                style={styles.fileButton}
                onPress={() => setFileName("document.pdf")}
              >
                <Text style={styles.fileButtonText}>Choose file</Text>
              </Pressable>
              <Text style={styles.fileNameText} numberOfLines={1}>
                {fileName || "No file chosen"}
              </Text>
            </View>
          </View>
        </View>

        {/* S+C B >>>>>>>>>> */}
        <View style={styles.buttonRow}>
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>

      </ScrollView>

      {/* nature m>>>>> */}
      <Modal
        visible={showNatureDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNatureDropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowNatureDropdown(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Document Nature</Text>
            <FlatList
              data={DOCUMENT_NATURE_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setDocumentNature(item);
                    setShowNatureDropdown(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

       {/* DOCUMENT C M >> */}
      <Modal
        visible={showCategoryDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCategoryDropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowCategoryDropdown(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Document Category</Text>
            <FlatList
              data={DOCUMENT_CATEGORY_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setDocumentCategory(item);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

       {/* SELECT RO M*/}
      <Modal
        visible={showRODropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRODropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowRODropdown(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select RO (multiple)</Text>
            <FlatList
              data={RO_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.modalOption,
                    selectedROs.includes(item) && styles.modalOptionSelected,
                  ]}
                  onPress={() => toggleRO(item)}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      selectedROs.includes(item) && styles.modalOptionTextSelected,
                    ]}
                  >
                    {selectedROs.includes(item) ? "✓ " : "  "}
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.modalDoneButton}
              onPress={() => setShowRODropdown(false)}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  container: {
    padding: 16,
  },
  header: {
    backgroundColor: "#1B7A3D",
    padding: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  required: {
    color: "#E53935",
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  inputText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  placeholderText: {
    fontSize: 14,
    color: "#999",
    flex: 1,
  },
  iconRight: {
    fontSize: 18,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    minHeight: 80,
    textAlignVertical: "top",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fileButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fileButtonText: {
    fontSize: 13,
    color: "#333",
  },
  fileNameText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#1B7A3D",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#5A6268",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "80%",
    maxHeight: 400,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalOptionSelected: {
    backgroundColor: "#E8F5E9",
  },
  modalOptionText: {
    fontSize: 15,
    color: "#333",
  },
  modalOptionTextSelected: {
    color: "#1B7A3D",
    fontWeight: "bold",
  },
  modalDoneButton: {
    backgroundColor: "#1B7A3D",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
  },
  modalDoneText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});