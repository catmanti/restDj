from django.shortcuts import render

# Create your views here.


def list(request):
    # return render(request, 'frontend/vue.html')
    # return render(request, 'frontend/list.html')
    return render(request, 'frontend/test.html')
