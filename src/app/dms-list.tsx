import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const DUMMY_DATA = [
  {
    id: 1,
    title: "wdfrwer",
    issuedBy: "werwer",
    date: "Jun 17, 2026",
    documentType: "Notice",
    category: "General",
    sendTo: "RO Lahore (LH-3), RO Sheikhupura",
  },
  {
    id: 2,
    title: "werwer",
    issuedBy: "werwer",
    date: "Jun 26, 2026",
    documentType: "Circular",
    category: "General",
    sendTo: "RO Lahore (LH-2)",
  },
  {
    id: 3,
    title: "lkmklewqjklj",
    issuedBy: "l",
    date: "May 19, 2026",
    documentType: "Letter",
    category: "General",
    sendTo: "RO Lahore (LH-3)",
  },
  {
    id: 4,
    title: "Budget Report",
    issuedBy: "Admin",
    date: "Apr 10, 2026",
    documentType: "Notice",
    category: "Confidential",
    sendTo: "RO Faisalabad",
  },
  {
    id: 5,
    title: "Staff Meeting",
    issuedBy: "HR Dept",
    date: "Mar 05, 2026",
    documentType: "Memo",
    category: "General",
    sendTo: "RO Multan, RO Rawalpindi",
  },
  {
    id: 6,
    title: "Policy Update",
    issuedBy: "Director",
    date: "Feb 20, 2026",
    documentType: "Circular",
    category: "Urgent",
    sendTo: "RO Lahore (LH-1)",
  },
  {
    id: 7,
    title: "Leave Notice",
    issuedBy: "Admin",
    date: "Jan 15, 2026",
    documentType: "Notice",
    category: "General",
    sendTo: "RO Sheikhupura",
  },
  {
    id: 8,
    title: "Annual Report",
    issuedBy: "Finance",
    date: "Dec 01, 2025",
    documentType: "Letter",
    category: "Confidential",
    sendTo: "RO Lahore (LH-2), RO Multan",
  },
  {
    id: 9,
    title: "Training Schedule",
    issuedBy: "HR Dept",
    date: "Nov 18, 2025",
    documentType: "Memo",
    category: "General",
    sendTo: "RO Rawalpindi",
  },
  {
    id: 10,
    title: "Office Inspection Report",
    issuedBy: "Inspection Team",
    date: "Oct 12, 2025",
    documentType: "Report",
    category: "General",
    sendTo: "RO Lahore (LH-3)",
  },
  {
    id: 11,
    title: "Employee Attendance",
    issuedBy: "HR Dept",
    date: "Sep 28, 2025",
    documentType: "Memo",
    category: "General",
    sendTo: "RO Faisalabad, RO Multan",
  },
  {
    id: 12,
    title: "Security Guidelines",
    issuedBy: "Admin",
    date: "Aug 15, 2025",
    documentType: "Circular",
    category: "Urgent",
    sendTo: "All Regional Offices",
  },
  {
    id: 13,
    title: "Monthly Performance Report",
    issuedBy: "Director",
    date: "Jul 30, 2025",
    documentType: "Report",
    category: "Confidential",
    sendTo: "RO Lahore (LH-1), RO Rawalpindi",
  },
  {
    id: 14,
    title: "Public Complaint Summary",
    issuedBy: "Complaint Cell",
    date: "Jun 22, 2025",
    documentType: "Letter",
    category: "General",
    sendTo: "RO Lahore (LH-2)",
  },
  {
    id: 15,
    title: "New Office Timings",
    issuedBy: "Admin",
    date: "May 14, 2025",
    documentType: "Notice",
    category: "General",
    sendTo: "All Regional Offices",
  },{
    id: 16,
    title: "Financial Audit Report",
    issuedBy: "Finance Dept",
    date: "Apr 08, 2025",
    documentType: "Report",
    category: "Confidential",
    sendTo: "RO Faisalabad",
  },
  {
    id: 17,
    title: "Staff Promotion Notice",
    issuedBy: "HR Dept",
    date: "Mar 19, 2025",
    documentType: "Notice",
    category: "General",
    sendTo: "RO Multan",
  },
  {
    id: 18,
    title: "Emergency Contact List",
    issuedBy: "Admin",
    date: "Feb 11, 2025",
    documentType: "Memo",
    category: "Urgent",
    sendTo: "RO Lahore (LH-1), RO Sheikhupura",
  },
  {
    id: 19,
    title: "Procurement Guidelines",
    issuedBy: "Procurement Dept",
    date: "Jan 25, 2025",
    documentType: "Circular",
    category: "General",
    sendTo: "RO Rawalpindi",
  },
  {
    id: 20,
    title: "Office Renovation Plan",
    issuedBy: "Admin",
    date: "Dec 15, 2024",
    documentType: "Letter",
    category: "General",
    sendTo: "RO Lahore (LH-3)",
  },
  {
    id: 21,
    title: "Quarterly Progress Report",
    issuedBy: "Director",
    date: "Nov 10, 2024",
    documentType: "Report",
    category: "Confidential",
    sendTo: "RO Lahore (LH-2), RO Faisalabad",
  },
];


export default function DmsList() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 1000;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);

  // SORT>>>>>>>>>>>>>
  const sortedData = [...DUMMY_DATA].sort((a, b) => {
    const aVal = a[sortColumn as keyof typeof a];
    const bVal = b[sortColumn as keyof typeof b];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  // PAGINA>>>>>>>>>>>>>>
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const renderSortArrow = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? " ▲" : " ▼";
    }
    return " ⇅";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/*  search ka drop>>>>>>*/}
     
      <ScrollView contentContainerStyle={styles.container}>
        {/* TITLE >>>*/}
        <Text style={styles.pageTitle}>DMS list ({DUMMY_DATA.length})</Text>
 <View style={styles.entriesRow}>
        <Text style={styles.entriesLabel}>Show</Text>
        <Pressable
          style={styles.entriesDropdown}
          onPress={() => setShowEntriesDropdown(!showEntriesDropdown)}
        >
          <Text style={styles.entriesValue}>{itemsPerPage}</Text>
          <Text style={styles.entriesArrow}>▼</Text>
        </Pressable>
        <Text style={styles.entriesLabel}>entries</Text>
      </View>

      {showEntriesDropdown && (
        <View style={styles.entriesOptions}>
          {[3, 5, 10, 25].map((num) => (
            <Pressable
              key={num}
              style={[
                styles.entriesOption,
                itemsPerPage === num && styles.entriesOptionActive,
              ]}
              onPress={() => {
                setItemsPerPage(num);
                setCurrentPage(1);
                setShowEntriesDropdown(false);
              }}
            >
              <Text
                style={[
                  styles.entriesOptionText,
                  itemsPerPage === num && styles.entriesOptionTextActive,
                ]}
              >
                {num}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
        {/* TABLE >>>>> */}
        {isLargeScreen ? (
          <View style={styles.tableWrapper}>

            {/*TABLE HEADER >>>>> */}
            <View style={styles.tableHeader}>
              <Pressable style={styles.cellSr} onPress={() => handleSort("id")}>
                <Text style={styles.headerCellText}>
                  Sr.#{renderSortArrow("id")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellTitle}
                onPress={() => handleSort("title")}
              >
                <Text style={styles.headerCellText}>
                  Title{renderSortArrow("title")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellMedium}
                onPress={() => handleSort("issuedBy")}
              >
                <Text style={styles.headerCellText}>
                  Issued By{renderSortArrow("issuedBy")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellMedium}
                onPress={() => handleSort("date")}
              >
                <Text style={styles.headerCellText}>
                  Date{renderSortArrow("date")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellMedium}
                onPress={() => handleSort("documentType")}
              >
                <Text style={styles.headerCellText}>
                  Document Type{renderSortArrow("documentType")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellMedium}
                onPress={() => handleSort("category")}
              >
                <Text style={styles.headerCellText}>
                  Category{renderSortArrow("category")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.cellLarge}
                onPress={() => handleSort("sendTo")}
              >
                <Text style={styles.headerCellText}>
                  Send To{renderSortArrow("sendTo")}
                </Text>
              </Pressable>
              <View style={styles.cellAction}>
                <Text style={styles.headerCellText}>Action</Text>
              </View>
            </View>

            {/* TABLE ROWS>>>>>> */}
            {pageData.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                <View style={styles.cellSr}>
                  <Text style={styles.cellText}>{item.id}</Text>
                </View>
                <View style={styles.cellTitle}>
                  <Text style={styles.cellText}>{item.title}</Text>
                </View>
                <View style={styles.cellMedium}>
                  <Text style={styles.cellText}>{item.issuedBy}</Text>
                </View>
                <View style={styles.cellMedium}>
                  <Text style={styles.cellText}>{item.date}</Text>
                </View>
                <View style={styles.cellMedium}>
                  <Text style={styles.cellText}>{item.documentType}</Text>
                </View>
                <View style={styles.cellMedium}>
                  <Text style={styles.cellText}>{item.category}</Text>
                </View>
                <View style={styles.cellLarge}>
                  <Text style={styles.cellText}>{item.sendTo}</Text>
                </View>
                <View style={styles.cellAction}>
                  <Text style={styles.eyeIcon}>👁</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View>

              {/* TABLE HEADER (mobile - scrollable) Tableeee ka responseive ka msla>>>>>> */}
              <View style={styles.tableHeader}>
                <Pressable style={styles.cellSr} onPress={() => handleSort("id")}>
                  <Text style={styles.headerCellText}>
                    Sr.#{renderSortArrow("id")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellTitle} onPress={() => handleSort("title")}>
                  <Text style={styles.headerCellText}>
                    Title{renderSortArrow("title")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellMedium} onPress={() => handleSort("issuedBy")}>
                  <Text style={styles.headerCellText}>
                    Issued By{renderSortArrow("issuedBy")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellMedium} onPress={() => handleSort("date")}>
                  <Text style={styles.headerCellText}>
                    Date{renderSortArrow("date")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellMedium} onPress={() => handleSort("documentType")}>
                  <Text style={styles.headerCellText}>
                    Document Type{renderSortArrow("documentType")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellMedium} onPress={() => handleSort("category")}>
                  <Text style={styles.headerCellText}>
                    Category{renderSortArrow("category")}
                  </Text>
                </Pressable>
                <Pressable style={styles.cellLarge} onPress={() => handleSort("sendTo")}>
                  <Text style={styles.headerCellText}>
                    Send To{renderSortArrow("sendTo")}
                  </Text>
                </Pressable>
                <View style={styles.cellAction}>
                  <Text style={styles.headerCellText}>Action</Text>
                </View>
              </View>

              {/* TABLE ROWS(mobile)>>>>>>> */}
              {pageData.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                  ]}
                >
                  <View style={styles.cellSr}>
                    <Text style={styles.cellText}>{item.id}</Text>
                  </View>
                  <View style={styles.cellTitle}>
                    <Text style={styles.cellText}>{item.title}</Text>
                  </View>
                  <View style={styles.cellMedium}>
                    <Text style={styles.cellText}>{item.issuedBy}</Text>
                  </View>
                  <View style={styles.cellMedium}>
                    <Text style={styles.cellText}>{item.date}</Text>
                  </View>
                  <View style={styles.cellMedium}>
                    <Text style={styles.cellText}>{item.documentType}</Text>
                  </View>
                  <View style={styles.cellMedium}>
                    <Text style={styles.cellText}>{item.category}</Text>
                  </View>
                  <View style={styles.cellLarge}>
                    <Text style={styles.cellText}>{item.sendTo}</Text>
                  </View>
                  <View style={styles.cellAction}>
                    <Text style={styles.eyeIcon}>👁</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* PAGINA>>>>*/}
        <View style={styles.paginationRow}>
          <Text style={styles.showingText}>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, DUMMY_DATA.length)} of{" "}
            {DUMMY_DATA.length} entries
          </Text>

          <View style={styles.paginationButtons}>
            <Pressable
              style={[
                styles.pageButton,
                currentPage === 1 && styles.pageButtonDisabled,
              ]}
              onPress={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === 1 && styles.pageButtonTextDisabled,
                ]}
              >
                Previous
              </Text>
            </Pressable>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pressable
                key={page}
                style={[
                  styles.pageNumber,
                  currentPage === page && styles.pageNumberActive,
                ]}
                onPress={() => setCurrentPage(page)}
              >
                <Text
                  style={[
                    styles.pageNumberText,
                    currentPage === page && styles.pageNumberTextActive,
                  ]}
                >
                  {page}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={[
                styles.pageButton,
                currentPage === totalPages && styles.pageButtonDisabled,
              ]}
              onPress={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === totalPages && styles.pageButtonTextDisabled,
                ]}
              >
                Next
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
   tableWrapper: {
    width: "100%",
  },
  container: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DEE2E6",
  },
  rowEven: {
    backgroundColor: "#FFFFFF",
  },
  rowOdd: {
    backgroundColor: "#F8F9FA",
  },
  headerCellText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#337AB7",
  },
  cellText: {
    fontSize: 13,
    color: "#333",
  },
  cellSr: {
    width: 60,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
  },
  cellTitle: {
    width: 120,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
  },
  cellMedium: {
    width: 130,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
  },
  cellLarge: {
    width: 200,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
  },
  cellAction: {
    width: 70,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    fontSize: 18,
    color: "#337AB7",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    flexWrap: "wrap",
    gap: 10,
    
  },
  showingText: {
    fontSize: 13,
    color: "#666",
  },
  paginationButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pageButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  pageButtonDisabled: {
    backgroundColor: "#F0F0F0",
  },
  pageButtonText: {
    fontSize: 13,
    color: "#337AB7",
  },
  pageButtonTextDisabled: {
    color: "#999",
  },
  pageNumber: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  pageNumberActive: {
    backgroundColor: "#337AB7",
    borderColor: "#337AB7",
  },
  pageNumberText: {
    fontSize: 13,
    color: "#337AB7",
  },
  pageNumberTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  entriesRow: {
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  entriesLabel: {
    fontSize: 13,
    color: "#333",
  },
  entriesDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  entriesValue: {
    fontSize: 13,
    color: "#333",
  },
  entriesArrow: {
    fontSize: 10,
    color: "#666",
  },
  entriesOptions: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 12,
    top: 10,
    left: 10,
  },
  entriesOption: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  entriesOptionActive: {
    backgroundColor: "#337AB7",
    borderColor: "#337AB7",
  },
  entriesOptionText: {
    fontSize: 13,
    color: "#333",
  },
  entriesOptionTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
