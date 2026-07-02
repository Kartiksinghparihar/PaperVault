from rest_framework import generics, permissions
from .models import Paper
from .serializers import PaperSerializer


class PaperListCreateView(generics.ListCreateAPIView):

    serializer_class = PaperSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Paper.objects.all()

        subject = self.request.query_params.get("subject")
        branch = self.request.query_params.get("branch")
        semester = self.request.query_params.get("semester")
        year = self.request.query_params.get("year")
        exam_type = self.request.query_params.get("exam_type")
        search = self.request.query_params.get("search")

        if subject:
            queryset = queryset.filter(subject__icontains=subject)

        if branch:
            queryset = queryset.filter(branch=branch)

        if semester:
            queryset = queryset.filter(semester=semester)

        if year:
            queryset = queryset.filter(year=year)

        if exam_type:
            queryset = queryset.filter(exam_type=exam_type)

        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class PaperDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Paper.objects.all()
    serializer_class = PaperSerializer
    permission_classes = [permissions.IsAuthenticated]